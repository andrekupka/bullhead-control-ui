import {AnyAction, Dispatch, MiddlewareAPI} from 'redux';
import {isOfType, TypeConstant} from 'typesafe-actions';
import {ResetActions} from './actions';

type RAMAction = AnyAction;
type RAMDispatch = Dispatch<RAMAction>;
export type RAMMiddlewwareAPI<S> = MiddlewareAPI<RAMDispatch, S>;

export const resetAwareMiddleware = <S>(resettingActionTypes: Array<TypeConstant>) => {
    return (api: RAMMiddlewwareAPI<S>) => (next: RAMDispatch) => (action: RAMAction) => {
        const result = next(action);
        if (isOfType(resettingActionTypes, action)) {
            api.dispatch(ResetActions.reset());
        }
        return result;
    };
};