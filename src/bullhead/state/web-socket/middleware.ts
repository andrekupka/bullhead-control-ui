import {Dispatch, MiddlewareAPI} from 'redux';
import {LightBullState} from '../index';
import {
    WEB_SOCKET_CONNECT,
    WEB_SOCKET_DISCONNECT,
    WebSocketActionTypes,
    webSocketConnect,
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
    let reconnect = false;

    const onOpen = (store: WSMiddlewareAPI) => () => {
        console.log('open');
        store.dispatch(webSocketConnected());
    };

    const onClose = (store: WSMiddlewareAPI) => () => {
        console.log('close');
        store.dispatch(webSocketDisconnected());
        if (reconnect) {
            setTimeout(() => store.dispatch(webSocketConnect()), 1000);
        }
    };

    const onError = (store: WSMiddlewareAPI) => (event: Event) => {
        console.log('error');
        store.dispatch(webSocketDisconnect());
    };

    return (store: WSMiddlewareAPI) => (next: WSDispatch) => (action: WebSocketActionTypes) => {
        switch (action.type) {
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
                socket.onclose = onClose(store);
                socket.onerror = onError(store);
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