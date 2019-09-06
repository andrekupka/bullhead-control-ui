import {AuthenticationAware} from '../../types/AuthenticationAware';
import {
    AuthenticationActionTypes,
    AuthenticationError,
    SIGN_IN_FAILURE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_OUT
} from './types';


interface AuthenticationState extends AuthenticationAware {
    isAuthenticating: boolean;
    authenticationError?: AuthenticationError;
}

const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false
};

export const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action: AuthenticationActionTypes): AuthenticationState => {
    switch (action.type) {
        case SIGN_IN_START:
            if (state.isAuthenticated) {
                return state;
            }
            return {
                ...state,
                isAuthenticating: true,
                authenticationError: undefined
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                authenticationError: undefined,
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                authenticationError: action.payload.error
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                authenticationError: undefined
            };
        default:
            return state;
    }
};
