import axios from 'axios';
import {Dispatch} from 'react';

import {
    AuthenticationActionTypes,
    AuthenticationError,
    SIGN_IN_FAILURE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_OUT
} from './types';

export const signInStart = (): AuthenticationActionTypes => ({
    type: SIGN_IN_START
});

export const signInSuccess = (): AuthenticationActionTypes => ({
    type: SIGN_IN_SUCCESS
});

export const signInFailure = (error: AuthenticationError): AuthenticationActionTypes => ({
    type: SIGN_IN_FAILURE,
    payload: {
        error: error
    }
});

export const signOut = (): AuthenticationActionTypes => ({
    type: SIGN_OUT
});

export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    dispatch(signInStart());

    try {
        await axios.post('http://localhost:8080/api/login', {
            password: password
        }, {
            timeout: 5000
        });
        dispatch(signInSuccess());
    } catch (error) {
        const code = error.code;
        if (code === 'ECONNABORTED') {
            dispatch(signInFailure(AuthenticationError.TIMEOUT));
        } else {
            const status = error.response.status;
            if (status === 401) {
                dispatch(signInFailure(AuthenticationError.WRONG_PASSWORD));
            } else {
                dispatch(signInFailure(AuthenticationError.GENERAL_FAILURE));
            }
        }
    }
};