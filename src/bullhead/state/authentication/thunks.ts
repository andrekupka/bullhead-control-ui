import {Dispatch} from 'react';
import {Api} from '../../store';
import {AuthenticationAction, AuthenticationActions} from './actions';


export const signIn = (password: string) => async (dispatch: Dispatch<AuthenticationAction>) => {
    dispatch(AuthenticationActions.request());

    try {
        const token = await Api.login(password);
        if (!token) {
            dispatch(AuthenticationActions.failure('An unknown error occurred'));
        } else {
            dispatch(AuthenticationActions.success(token));
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(AuthenticationActions.failure('Invalid password'));
            } else {
                dispatch(AuthenticationActions.failure('An unknown error occurred'));
            }
        } else {
            if (error.code === 'ECONNABORTED') {
                dispatch(AuthenticationActions.failure('Server took too long to respond'));
            } else {
                dispatch(AuthenticationActions.failure('An unknown error occurred'));
            }
        }
    }
};

export const signOut = () => (dispatch: Dispatch<AuthenticationAction>) => dispatch(AuthenticationActions.clear());
