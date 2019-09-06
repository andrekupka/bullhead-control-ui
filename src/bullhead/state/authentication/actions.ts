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

