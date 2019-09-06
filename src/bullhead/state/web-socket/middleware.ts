import {Dispatch, MiddlewareAPI} from 'redux';
import {LightBullState} from '../index';
import {
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WebSocketActionTypes,
    webSocketConnected,
    webSocketConnecting,
    webSocketDisconnect,
    webSocketDisconnected,
    webSocketDisconnecting
} from './actions';

type WSDispatch = Dispatch<WebSocketActionTypes>;
type WSMiddlewareAPI = MiddlewareAPI<WSDispatch, LightBullState>;

export const webSocketMiddleware = () => {
    let socket: WebSocket | null = null;

    const onOpen = (store: WSMiddlewareAPI) => () => {
        store.dispatch(webSocketConnected());
    };

    const onClose = (store: WSMiddlewareAPI) => () => {
        store.dispatch(webSocketDisconnected());
        // TODO reconnect
    };

    const onError = (store: WSMiddlewareAPI) => (event: Event) => {
        store.dispatch(webSocketDisconnect());
    };

    return (store: WSMiddlewareAPI) => (next: WSDispatch) => (action: WebSocketActionTypes) => {
        switch (action.type) {
            case WEB_SOCKET_CONNECT:
                if (socket !== null) {
                    socket.close();
                }

                store.dispatch(webSocketConnecting());

                socket = new WebSocket(action.payload.host);
                socket.onopen = onOpen(store);
                socket.onclose = onClose(store);
                socket.onerror = onError(store);
                break;
            case WEB_SOCKET_DISCONNECT:
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