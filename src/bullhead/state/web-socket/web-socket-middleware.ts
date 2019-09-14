import {Dispatch, MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullMessage} from '../../types/types';
import {LightBullState} from '../index';
import {WebSocketAction, WebSocketActions} from './actions';

type WSAction = WebSocketAction;
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
        api.dispatch(WebSocketActions.connected());
    };

    const onMessage = (api: WSMiddlewareAPI) => (event: MessageEvent) => {
        const {type, payload, meta} = JSON.parse(event.data);
        if (!type ){
            return;
        }

        api.dispatch(WebSocketActions.received({
            type,
            payload,
            meta
        }));
    };

    const onClose = (api: WSMiddlewareAPI) => () => {
        api.dispatch(WebSocketActions.disconnected());
        if (reconnect) {
            setTimeout(() => api.dispatch(WebSocketActions.connect()), 2000);
        }
    };

    const onError = (api: WSMiddlewareAPI) => (event: Event) => {
        api.dispatch(WebSocketActions.disconnect(false));
    };

    return (api: WSMiddlewareAPI) => (next: WSDispatch) => (action: WSAction) => {
        switch (action.type) {
            case getType(WebSocketActions.connect):
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
            case getType(WebSocketActions.send):
                send(action.payload.message);
                break;
            case getType(WebSocketActions.disconnect):
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
