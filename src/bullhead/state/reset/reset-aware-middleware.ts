import {Dispatch, MiddlewareAPI} from 'redux';
import {isOfType, TypeConstant} from 'typesafe-actions';
import {LightBullState} from '../index';
import {ResetAction, ResetActions} from './actions';

type RAMAction = ResetAction;
type RAMDispatch = Dispatch<RAMAction>;
type RAMMiddlewwareAPI = MiddlewareAPI<RAMDispatch, LightBullState>;

export const resetAwareMiddleware = (resettingActionTypes: Array<TypeConstant>) => {
    return (api: RAMMiddlewwareAPI) => (next: RAMDispatch) => (action: RAMAction) => {
        const result = next(action);
        if (isOfType(resettingActionTypes, action)) {
            api.dispatch(ResetActions.reset());
        }
        return result;
    };
};