import {
    AuthenticationActionTypes,
    AuthenticationError,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_CLEAR, AUTHENTICATION_LOST, AUTHENTICATION_LOAD,
} from './actions';

export interface AuthenticationState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    token?: string;
    authenticationLost: boolean;
    authenticationError?: AuthenticationError;
}

export const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationLost: false
};

export const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action: AuthenticationActionTypes): AuthenticationState => {
    switch (action.type) {
        case AUTHENTICATION_LOAD:
            return {
                isAuthenticated: true,
                isAuthenticating: false,
                token: action.payload.token,
                authenticationLost: false,
            };
        case AUTHENTICATION_START:
            if (state.isAuthenticated) {
                return state;
            }
            return {
                ...state,
                isAuthenticating: true,
                authenticationError: undefined
            };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                token: action.payload.token,
                authenticationLost: false,
                authenticationError: undefined
            };
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                authenticationLost: false,
                authenticationError: action.payload.error
            };
        case AUTHENTICATION_LOST:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                token: undefined,
                authenticationLost: true
            };
        case AUTHENTICATION_CLEAR:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                token: undefined
            };
        default:
            return state;
    }
};
