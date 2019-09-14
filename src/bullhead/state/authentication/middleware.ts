import {Dispatch, MiddlewareAPI} from 'redux';
import {LightBullState} from '../index';
import {AuthenticationAction, AuthenticationActions} from './actions';
import { getType } from 'typesafe-actions';

type TPMAction = AuthenticationAction;
type TPMDispatch = Dispatch<TPMAction>;
type TPMMiddlewareAPI = MiddlewareAPI<TPMDispatch, LightBullState>;

export const tokenPersistingMiddleware = (localStorageKey: string) => {
    return (api: TPMMiddlewareAPI) => (next: TPMDispatch) => (action: TPMAction) => {
        switch (action.type) {
            case getType(AuthenticationActions.success):
                const token = action.payload.token;
                localStorage.setItem(localStorageKey, token);
                break;
            case getType(AuthenticationActions.lost):
            case getType(AuthenticationActions.clear):
                localStorage.removeItem(localStorageKey);
                break;
        }
        return next(action);
    };
};
