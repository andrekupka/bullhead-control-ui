import {AuthenticationActionTypes, SET_AUTHENTICATED} from './types';

export const setAuthenticated = (isAuthenticated: boolean): AuthenticationActionTypes => ({
    type: SET_AUTHENTICATED,
    payload: {
        isAuthenticated: isAuthenticated
    }
});