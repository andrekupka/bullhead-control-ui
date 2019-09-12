import {MiddlewareAPI} from 'redux';
import {LightBullThunkDispatch} from '../../types/redux';
import {AUTHENTICATION_LOAD, AUTHENTICATION_SUCCESS, AuthenticationActionTypes} from '../authentication/actions';
import {LightBullState} from '../index';
import {startLoading} from './thunks';

type PLMAction = AuthenticationActionTypes;
type PLMDispatch = LightBullThunkDispatch;
type PLMMiddlewareAPI = MiddlewareAPI<PLMDispatch, LightBullState>;

export const loadingMiddleware = () => {
    return (api: PLMMiddlewareAPI) => (next: PLMDispatch) => (action: PLMAction) => {
        const result = next(action);
        if (action.type === AUTHENTICATION_SUCCESS || action.type === AUTHENTICATION_LOAD) {
            api.dispatch(startLoading());
        }
        return result;
    };
};
