import {Dispatch, MiddlewareAPI} from 'redux';
import {AUTHENTICATION_CLEAR, AUTHENTICATION_LOST, AUTHENTICATION_SUCCESS, AuthenticationActionTypes} from "./actions";
import {LightBullState} from "../index";

type TPMAction = AuthenticationActionTypes;
type TPMDispatch = Dispatch<AuthenticationActionTypes>;
type TPMMiddlewareAPI = MiddlewareAPI<TPMDispatch, LightBullState>;

export const tokenPersistingMiddleware = (localStorageKey: string) => {
    return (api: TPMMiddlewareAPI) => (next: TPMDispatch) => (action: TPMAction) => {
        switch (action.type) {
            case AUTHENTICATION_SUCCESS:
                const token = action.payload.token;
                localStorage.setItem(localStorageKey, token);
                break;
            case AUTHENTICATION_LOST:
            case AUTHENTICATION_CLEAR:
                localStorage.removeItem(localStorageKey);
                break;
        }
        return next(action);
    };
};
