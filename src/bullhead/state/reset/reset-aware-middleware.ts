import {isActionOf} from 'typesafe-actions';
import {AuthenticationActions} from '../authentication/actions';
import {LightBullState} from '../index';
import {WebSocketActions} from '../web-socket/actions';
import {ResetAction, ResetActions} from './actions';
import {Dispatch, MiddlewareAPI} from 'redux';

type RAMAction = ResetAction;
type RAMDispatch = Dispatch<RAMAction>;
type RAMMiddlewwareAPI = MiddlewareAPI<RAMDispatch, LightBullState>;

export const resetAwareMiddleware = () => {
    return (api: RAMMiddlewwareAPI) => (next: RAMDispatch) => (action: RAMAction) => {
        const result = next(action);
        if (isActionOf([AuthenticationActions.lost, AuthenticationActions.clear, WebSocketActions.disconnected], action)) {
            api.dispatch(ResetActions.reset());
        }
        return result;
    };
};