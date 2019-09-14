import {Dispatch, MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullMessage} from '../../types/types';
import {AuthenticationAction, AuthenticationActions} from '../authentication/actions';
import {LightBullState} from '../index';
import {ShowsAction, ShowsActions} from '../model/shows/actions';
import {WebSocketAction, WebSocketActions} from './actions';

type WSAction = WebSocketAction | AuthenticationAction | ShowsAction;
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
        const token = api.getState().authentication.token;
        if (!token) {
            throw new Error('Invalid state, token is not initialized');
        }
        api.dispatch(WebSocketActions.authenticate());
        send({
            type: 'authenticate',
            payload: {
                token: token
            }
        });
    };

    const onMessage = (api: WSMiddlewareAPI) => (event: MessageEvent) => {
        const {type, connectionId, payload} = JSON.parse(event.data);
        const ownConnectionId = api.getState().webSocket.connectionId;
        if (connectionId && connectionId === ownConnectionId) {
            return;
        }

        switch (type) {
            case 'authenticated':
                if (payload && payload.connectionId) {
                    api.dispatch(WebSocketActions.authenticated(payload.connectionId));
                } else {
                    api.dispatch(AuthenticationActions.lost());
                }
                break;
            case 'unauthenticated':
                api.dispatch(AuthenticationActions.lost());
                break;
            case 'addShow':
                api.dispatch(ShowsActions.add(payload.show))
                break;
        }
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
            case getType(AuthenticationActions.success):
                const signInResult = next(action);
                api.dispatch(WebSocketActions.connect());
                return signInResult;
            case getType(AuthenticationActions.clear):
            case getType(AuthenticationActions.lost):
                const signOutResult = next(action);
                api.dispatch(WebSocketActions.disconnect(true));
                return signOutResult;
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
