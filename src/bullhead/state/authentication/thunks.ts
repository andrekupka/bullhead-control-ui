import {Dispatch} from 'react';
import {axiosClient} from '../../common/http';
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
        const response = await axiosClient.post('/api/login', {
            password: password
        });
        const {token} = response.data;
        if (!token) {
            dispatch(authenticationFailure(AuthenticationError.UNKNOWN_ERROR));
        }
        dispatch(authenticationSuccess(token));
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
