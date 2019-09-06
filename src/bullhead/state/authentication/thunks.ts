import {Dispatch} from 'react';
import {axiosClient} from '../../common/http';
import {signInFailure, signInStart, signInSuccess} from './actions';
import {AuthenticationActionTypes, AuthenticationError} from './types';

export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    dispatch(signInStart());

    try {
        const { token } = await axiosClient.post('/api/login', {
            password: password
        });
        if (!token) {
            dispatch(signInFailure(AuthenticationError.UNKNOWN_ERROR))
        }
        dispatch(signInSuccess(token));
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(signInFailure(AuthenticationError.WRONG_PASSWORD));
            } else {
                dispatch(signInFailure(AuthenticationError.UNKNOWN_ERROR));
            }
        } else {
            if (error.code === 'ECONNABORTED') {
                dispatch(signInFailure(AuthenticationError.TIMEOUT));
            } else {
                dispatch(signInFailure(AuthenticationError.UNKNOWN_ERROR));
            }
        }
    }
};