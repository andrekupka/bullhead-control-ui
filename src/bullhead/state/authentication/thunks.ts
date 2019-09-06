import {Dispatch} from 'react';
import {axiosClient} from '../../common/http';
import {webSocketConnect} from '../web-socket/actions';
import {AuthenticationActionTypes, AuthenticationError, signInFailure, signInStart, signInSuccess} from './actions';

export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    dispatch(signInStart());

    try {
        const response = await axiosClient.post('/api/login', {
            password: password
        });
        const {token} = response.data;
        if (!token) {
            dispatch(signInFailure(AuthenticationError.UNKNOWN_ERROR));
        }
        dispatch(signInSuccess(token));
        dispatch(webSocketConnect('ws://localhost:8080'));
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