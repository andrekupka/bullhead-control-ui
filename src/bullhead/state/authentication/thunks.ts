import {Dispatch} from 'react';
import {axiosClient} from '../../common/http';
import {
    webSocketConnect,
    WebSocketConnectType,
    webSocketDisconnect,
    WebSocketDisconnectType
} from '../web-socket/actions';
import {
    AuthenticationActionTypes,
    AuthenticationError,
    signInFailure,
    signInStart,
    signInSuccess,
    signOutFinish
} from './actions';

export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes | WebSocketConnectType>) => {
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
        dispatch(webSocketConnect());
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

export const signOut = () => (dispatch: Dispatch<AuthenticationActionTypes | WebSocketDisconnectType>) => {
    dispatch(signOutFinish());
    dispatch(webSocketDisconnect(true));
};