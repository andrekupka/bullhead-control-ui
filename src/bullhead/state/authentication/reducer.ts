import {createReducer} from 'typesafe-actions';
import {AuthenticationAction, AuthenticationActions} from './actions';

export interface AuthenticationState {
    isAuthenticated: boolean;
    token?: string;
    authenticationLost: boolean;
    authenticationError?: string;
}

export const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    authenticationLost: false
};

export const authenticationReducer = createReducer<AuthenticationState, AuthenticationAction>(INITIAL_STATE)
    .handleAction(AuthenticationActions.load, (state, action) => ({
        isAuthenticated: true,
        token: action.payload.token,
        authenticationLost: false
    }))
    .handleAction(AuthenticationActions.success, (state, action) => ({
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        authenticationLost: false,
        authenticationError: undefined
    }))
    .handleAction(AuthenticationActions.failure, (state, action) => ({
        ...state,
        isAuthenticated: false,
        authenticationLost: false,
        authenticationError: action.payload.error
    }))
    .handleAction(AuthenticationActions.lost, state => ({
        ...state,
        isAuthenticated: false,
        token: undefined,
        authenticationLost: true
    }))
    .handleAction(AuthenticationActions.clear, state => ({
        ...state,
        isAuthenticated: false,
        token: undefined
    }));