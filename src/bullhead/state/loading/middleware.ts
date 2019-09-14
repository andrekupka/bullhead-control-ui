import {MiddlewareAPI} from 'redux';
import {LightBullThunkDispatch} from '../../types/redux';
import {AuthenticationActionTypes} from '../authentication/actions';
import {LightBullState} from '../index';
import {WEB_SOCKET_AUTHENTICATED, WEB_SOCKET_DISCONNECTED, WebSocketActionTypes} from '../web-socket/actions';
import {LoadingActions} from './actions';
import {startLoading} from './thunks';

type PLMAction = AuthenticationActionTypes | WebSocketActionTypes;
type PLMDispatch = LightBullThunkDispatch;
type PLMMiddlewareAPI = MiddlewareAPI<PLMDispatch, LightBullState>;

export const loadingMiddleware = () => {
    return (api: PLMMiddlewareAPI) => (next: PLMDispatch) => (action: PLMAction) => {
        const result = next(action);
        if (action.type === WEB_SOCKET_AUTHENTICATED) {
            api.dispatch(LoadingActions.enable());
            api.dispatch(startLoading());
        } else if (action.type === WEB_SOCKET_DISCONNECTED) {
            api.dispatch(LoadingActions.disable());
        }
        return result;
    };
};
