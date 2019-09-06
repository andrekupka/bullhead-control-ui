import {Dispatch, MiddlewareAPI} from 'redux';
import {AuthenticationActionTypes, SIGN_OUT, signInSuccess, signOut, TOKEN_ACQUIRED} from '../authentication/actions';
import {LightBullState} from '../index';
import {
    WEB_SOCKET_AUTHENTICATE,
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WEB_SOCKET_SEND,
    WebSocketActionTypes,
    webSocketAuthenticate,
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
    let token: string | null = null;

    const getSocket = (): WebSocket => {
        if (socket === null) {
            throw new Error('Invalid state, socket is not initialized');
        }
        return socket;
    };

    const getToken = (): string => {
        if (token === null) {
            throw new Error('Invalid state, token is not initialized');
        }
        return token;
    };

    const onOpen = (store: WSMiddlewareAPI) => () => {
        console.log('connected');
        store.dispatch(webSocketConnected());
        store.dispatch(webSocketAuthenticate(getToken()));
    };

    const onMessage = (store: WSMiddlewareAPI) => (event: MessageEvent) => {
        const {type, payload} = JSON.parse(event.data);
        switch (type) {
            case 'authenticated':
                console.log('authenticated');
                store.dispatch(signInSuccess());
                break;
            case 'unauthenticated':
                console.log('unauthenticated');
                store.dispatch(signOut());
                break;
        }
    };

    const onClose = (store: WSMiddlewareAPI) => () => {
        console.log('close');
        store.dispatch(webSocketDisconnected());
        if (reconnect) {
            setTimeout(() => store.dispatch(webSocketConnect()), 2000);
        }
    };

    const onError = (store: WSMiddlewareAPI) => (event: Event) => {
        console.log('error');
        store.dispatch(webSocketDisconnect());
    };

    return (store: WSMiddlewareAPI) => (next: WSDispatch) => (action: WSActions) => {
        switch (action.type) {
            case TOKEN_ACQUIRED:
                const signInResult = next(action);
                token = action.payload.token;
                store.dispatch(webSocketConnect());
                return signInResult;
            case SIGN_OUT:
                const signOutResult = next(action);
                store.dispatch(webSocketDisconnect(true));
                return signOutResult;
            case WEB_SOCKET_CONNECT:
                if (socket !== null) {
                    console.warn('Already connected');
                    socket.close();
                }
                reconnect = true;

                console.log('connect');
                store.dispatch(webSocketConnecting());

                socket = new WebSocket('ws://localhost:8080');
                socket.onopen = onOpen(store);
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onerror = onError(store);
                break;
            case WEB_SOCKET_AUTHENTICATE:
                getSocket().send(JSON.stringify({
                    type: 'authenticate',
                    payload: {
                        token: token
                    }
                }));
                break;
            case WEB_SOCKET_SEND:
                if (!store.getState().authentication.isAuthenticated) {
                    throw new Error('Cannot send message, unauthenticated');
                }
                getSocket().send(JSON.stringify(action.payload.message));
                break;
            case WEB_SOCKET_DISCONNECT:
                console.log('disconnect');
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