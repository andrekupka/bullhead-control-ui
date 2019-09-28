import {MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullThunkDispatch} from '../types/redux';
import {AuthenticationAction, AuthenticationActions} from './authentication/actions';
import {ConnectionAction, ConnectionActions} from './connection/actions';
import {LightBullState} from './index';
import {InitializationActions} from './app/initialization/actions';
import {startInitialization} from './app/initialization/thunks';
import {WebSocketAction, WebSocketActions} from './web-socket/actions';

type LCAction = AuthenticationAction | ConnectionAction | WebSocketAction;
type LCDispatch = LightBullThunkDispatch;
type LCMiddlewareAPI = MiddlewareAPI<LCDispatch, LightBullState>;

export const lifecycleMiddleware = () => {
    return (api: LCMiddlewareAPI) => (next: LCDispatch) => (action: LCAction) => {
        const result = next(action);
        switch (action.type) {
            // connect web-socket on load or authentication success
            case getType(AuthenticationActions.load):
                api.dispatch(WebSocketActions.connect());
                break;
            case getType(AuthenticationActions.success):
                api.dispatch(WebSocketActions.connect());
                break;
            // identify connection when web-socket is connected
            case getType(WebSocketActions.connected):
                api.dispatch(ConnectionActions.identify());
                break;
            // start initialization when connection is identified
            case getType(ConnectionActions.identified):
                api.dispatch(InitializationActions.enable());
                api.dispatch(startInitialization());
                break;
            // handle web-socket message in connection handler
            case getType(WebSocketActions.received):
                api.dispatch(ConnectionActions.handleMessage(action.payload.message));
                break;
            case getType(WebSocketActions.disconnected):
                api.dispatch(ConnectionActions.destroy);
                api.dispatch(InitializationActions.disable());
                break;
            case getType(AuthenticationActions.lost):
            case getType(AuthenticationActions.clear):
                api.dispatch(ConnectionActions.destroy);
                api.dispatch(WebSocketActions.disconnect(true));
                break;
        }
        return result;
    };
};