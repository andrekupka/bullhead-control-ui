import {AuthenticationActionTypes, SET_AUTHENTICATED} from './types';

interface AuthenticationState {
    isAuthenticated: boolean;
}

const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false
};

export const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action: AuthenticationActionTypes): AuthenticationState => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            };
        default:
            return state;
    }
};
