import {
    AuthenticationActionTypes,
    AuthenticationError,
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_START,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_CLEAR,
} from './actions';

interface AuthenticationState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    token?: string;
    authenticationError?: AuthenticationError;
}

const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false
};

export const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action: AuthenticationActionTypes): AuthenticationState => {
    switch (action.type) {
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
                authenticationError: undefined
            };
        case AUTHENTICATION_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                authenticationError: action.payload.error
            };
        case AUTHENTICATION_CLEAR:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                token: undefined,
                authenticationError: undefined
            };
        default:
            return state;
    }
};
