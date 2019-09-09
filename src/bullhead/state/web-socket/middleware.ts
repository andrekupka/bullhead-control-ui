import {Dispatch, MiddlewareAPI} from 'redux';
import {LightBullMessage} from '../../types/types';
import {
    AUTHENTICATION_CLEAR,
    AUTHENTICATION_LOST,
    AUTHENTICATION_SUCCESS,
    AuthenticationActionTypes,
    authenticationLost
} from '../authentication/actions';
import {LightBullState} from '../index';
import {
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WEB_SOCKET_SEND,
    WebSocketActionTypes,
    webSocketAuthenticate,
    webSocketAuthenticated,
    webSocketConnect,
    webSocketConnected,
    webSocketDisconnect,
    webSocketDisconnected
} from './actions';

type WSAction = WebSocketActionTypes | AuthenticationActionTypes;
type WSDispatch = Dispatch<WSAction>;
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

    const onOpen = (api: WSMiddlewareAPI) => () => {
        api.dispatch(webSocketConnected());
        const token = api.getState().authentication.token;
        if (!token) {
            throw new Error('Invalid state, token is not initialized');
        }
        api.dispatch(webSocketAuthenticate());
        send({
            type: 'authenticate',
            payload: {
                token: token
            }
        });
    };

    const onMessage = (api: WSMiddlewareAPI) => (event: MessageEvent) => {
        const {type, payload} = JSON.parse(event.data);
        switch (type) {
            case 'authenticated':
                api.dispatch(webSocketAuthenticated());
                break;
            case 'unauthenticated':
                api.dispatch(authenticationLost());
                break;
        }
    };

    const onClose = (api: WSMiddlewareAPI) => () => {
        api.dispatch(webSocketDisconnected());
        if (reconnect) {
            setTimeout(() => api.dispatch(webSocketConnect()), 2000);
        }
    };

    const onError = (api: WSMiddlewareAPI) => (event: Event) => {
        api.dispatch(webSocketDisconnect());
    };

    return (api: WSMiddlewareAPI) => (next: WSDispatch) => (action: WSAction) => {
        switch (action.type) {
            case AUTHENTICATION_SUCCESS:
                const signInResult = next(action);
                api.dispatch(webSocketConnect());
                return signInResult;
            case AUTHENTICATION_CLEAR:
            case AUTHENTICATION_LOST:
                const signOutResult = next(action);
                api.dispatch(webSocketDisconnect(true));
                return signOutResult;
            case WEB_SOCKET_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                reconnect = true;

                const connectResult = next(action);

                socket = new WebSocket('ws://localhost:8080');
                socket.onopen = onOpen(api);
                socket.onmessage = onMessage(api);
                socket.onclose = onClose(api);
                socket.onerror = onError(api);
                return connectResult;
            case WEB_SOCKET_SEND:
                const {isConnected, isAuthenticated} = api.getState().webSocket;
                if (!isConnected || !isAuthenticated) {
                    throw new Error('Cannot send message, unauthenticated');
                }
                send(action.payload.message);
                break;
            case WEB_SOCKET_DISCONNECT:
                if (action.payload.permanent) {
                    reconnect = false;
                }

                const disconnectResult = next(action);
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                return disconnectResult;
            default:
                return next(action);
        }
    };
};
