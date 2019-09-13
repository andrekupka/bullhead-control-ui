import {Dispatch} from 'react';
import {Api} from '../../store';
import {
    AuthenticationActionTypes,
    authenticationClear,
    authenticationFailure,
    authenticationStart,
    authenticationSuccess
} from './actions';



export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    dispatch(authenticationStart());

    try {
        const token = await Api.login(password);
        if (!token) {
            dispatch(authenticationFailure('An unknown error occurred'));
        } else {
            dispatch(authenticationSuccess(token));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(authenticationFailure('Invalid password'));
            } else {
                dispatch(authenticationFailure('An unknown error occurred'));
            }
        } else {
            if (error.code === 'ECONNABORTED') {
                dispatch(authenticationFailure('Server took too long to respond'));
            } else {
                dispatch(authenticationFailure('An unknown error occurred'));
            }
        }
    }
};

export const signOut = () => (dispatch: Dispatch<AuthenticationActionTypes>) => dispatch(authenticationClear());
