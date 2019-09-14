import {MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullThunkDispatch} from '../../types/redux';
import {LightBullState} from '../index';
import {WebSocketAction, WebSocketActions} from '../web-socket/actions';
import {LoadingActions} from './actions';
import {startLoading} from './thunks';

type PLMAction = WebSocketAction;
type PLMDispatch = LightBullThunkDispatch;
type PLMMiddlewareAPI = MiddlewareAPI<PLMDispatch, LightBullState>;

export const loadingMiddleware = () => {
    return (api: PLMMiddlewareAPI) => (next: PLMDispatch) => (action: PLMAction) => {
        const result = next(action);
        if (action.type === getType(WebSocketActions.authenticated)) {
            api.dispatch(LoadingActions.enable());
            api.dispatch(startLoading());
        } else if (action.type === getType(WebSocketActions.disconnected)) {
            api.dispatch(LoadingActions.disable());
        }
        return result;
    };
};
