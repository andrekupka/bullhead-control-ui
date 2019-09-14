import {createReducer} from 'typesafe-actions';
import {AuthenticationAction, AuthenticationActions} from './actions';

export interface AuthenticationState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    token?: string;
    authenticationLost: boolean;
    authenticationError?: string;
}

export const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationLost: false
};

export const authenticationReducer = createReducer<AuthenticationState, AuthenticationAction>(INITIAL_STATE)
    .handleAction(AuthenticationActions.load, (state, action) => ({
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.payload.token,
        authenticationLost: false
    }))
    .handleAction(AuthenticationActions.request, state => {
        if (state.isAuthenticated) {
            return state;
        }
        return {
            ...state,
            isAuthenticating: true,
            authenticationError: undefined
        };
    })
    .handleAction(AuthenticationActions.success, (state, action) => ({
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.payload.token,
        authenticationLost: false,
        authenticationError: undefined
    }))
    .handleAction(AuthenticationActions.failure, (state, action) => ({
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        authenticationLost: false,
        authenticationError: action.payload.error
    }))
    .handleAction(AuthenticationActions.lost, state => ({
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        token: undefined,
        authenticationLost: true
    }))
    .handleAction(AuthenticationActions.clear, state => ({
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        token: undefined
    }));