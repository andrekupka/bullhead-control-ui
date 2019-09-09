import {Dispatch} from 'react';
import {Api} from '../../store';
import {
    AuthenticationActionTypes,
    AuthenticationError,
    authenticationStart,
    authenticationFailure,
    authenticationSuccess, authenticationClear
} from './actions';

export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    dispatch(authenticationStart());

    try {
        const token = await Api.login(password);
        if (!token) {
            dispatch(authenticationFailure(AuthenticationError.UNKNOWN_ERROR));
        } else {
            dispatch(authenticationSuccess(token));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(authenticationFailure(AuthenticationError.WRONG_PASSWORD));
            } else {
                dispatch(authenticationFailure(AuthenticationError.UNKNOWN_ERROR));
            }
        } else {
            if (error.code === 'ECONNABORTED') {
                dispatch(authenticationFailure(AuthenticationError.TIMEOUT));
            } else {
                dispatch(authenticationFailure(AuthenticationError.UNKNOWN_ERROR));
            }
        }
    }
};

export const signOut = () => (dispatch: Dispatch<AuthenticationActionTypes>) => dispatch(authenticationClear());
