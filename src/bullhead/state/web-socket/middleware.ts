import {Dispatch, MiddlewareAPI} from 'redux';
import {LightBullMessage} from '../../types/types';
import {
    AUTHENTICATION_CLEAR, AUTHENTICATION_LOST,
    AUTHENTICATION_SUCCESS,
    AuthenticationActionTypes,
    authenticationLost,
} from '../authentication/actions';
import {LightBullState} from '../index';
import {
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WEB_SOCKET_SEND,
    WebSocketActionTypes,
    webSocketAuthenticated,
    webSocketAuthenticating,
    webSocketConnect,
    webSocketConnected,
    webSocketConnecting,
    webSocketDisconnect,
    webSocketDisconnected,
    webSocketDisconnecting
} from './actions';

type WSActions = WebSocketActionTypes | AuthenticationActionTypes;
type WSDispatch = Dispatch<WSActions>;
type WSMiddlewareAPI = MiddlewareAPI<WSDispatch, LightBullState>;

export const webSocketMiddleware = () => {
    let socket: WebSocket | null = null;
    let reconnect = false;

    const send = (message: LightBullMessage) => {
        if (socket === null) {
            throw new Error('Invalid state, socket is not initialized');
        }
        socket.send(JSON.stringify(message));
    };

    const onOpen = (store: WSMiddlewareAPI) => () => {
        console.log('connected');
        store.dispatch(webSocketConnected());
        const token = store.getState().authentication.token;
        if (!token) {
            throw new Error('Invalid state, token is not initialized');
        }
        store.dispatch(webSocketAuthenticating());
        send({
            type: 'authenticate',
            payload: {
                token: token
            }
        });
    };

    const onMessage = (store: WSMiddlewareAPI) => (event: MessageEvent) => {
        const {type, payload} = JSON.parse(event.data);
        switch (type) {
            case 'authenticated':
                store.dispatch(webSocketAuthenticated());
                break;
            case 'unauthenticated':
                store.dispatch(authenticationLost());
                break;
        }
    };

    const onClose = (store: WSMiddlewareAPI) => () => {
        store.dispatch(webSocketDisconnected());
        if (reconnect) {
            setTimeout(() => store.dispatch(webSocketConnect()), 2000);
        }
    };

    const onError = (store: WSMiddlewareAPI) => (event: Event) => {
        store.dispatch(webSocketDisconnect());
    };

    return (store: WSMiddlewareAPI) => (next: WSDispatch) => (action: WSActions) => {
        switch (action.type) {
            case AUTHENTICATION_SUCCESS:
                const signInResult = next(action);
                store.dispatch(webSocketConnect());
                return signInResult;
            case AUTHENTICATION_CLEAR:
            case AUTHENTICATION_LOST:
                const signOutResult = next(action);
                store.dispatch(webSocketDisconnect(true));
                return signOutResult;
            case WEB_SOCKET_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                reconnect = true;

                store.dispatch(webSocketConnecting());

                socket = new WebSocket('ws://localhost:8080');
                socket.onopen = onOpen(store);
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onerror = onError(store);
                break;
            case WEB_SOCKET_SEND:
                const {isConnected, isAuthenticated} = store.getState().webSocket;
                if (!isConnected || ! isAuthenticated) {
                    throw new Error('Cannot send message, unauthenticated');
                }
                send(action.payload.message);
                break;
            case WEB_SOCKET_DISCONNECT:
                if (action.payload.permanent) {
                    reconnect = false;
                }
                store.dispatch(webSocketDisconnecting());
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            default:
                return next(action);
        }
    };
};
