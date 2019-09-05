import {AuthenticationActionTypes, SIGN_IN, SIGN_OUT} from './types';

export const signIn = (password: string): AuthenticationActionTypes => ({
    type: SIGN_IN,
    payload: {
        password: password
    }
});


export const signOut = (): AuthenticationActionTypes => ({
    type: SIGN_OUT
});