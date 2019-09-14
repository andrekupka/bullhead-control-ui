import {createReducer} from 'typesafe-actions';
import {WebSocketAction, WebSocketActions} from './actions';

export interface WebSocketState {
    isConnected: boolean;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    isConnecting: boolean;
    isDisconnecting: boolean;
    connectionId?: string;
}

export const INITIAL_STATE: WebSocketState = {
    isConnecting: false,
    isConnected: false,
    isAuthenticating: false,
    isAuthenticated: false,
    isDisconnecting: false,
};

export const webSocketReducer = createReducer<WebSocketState, WebSocketAction>(INITIAL_STATE)
    .handleAction(WebSocketActions.connect, state => ({
        ...state,
        isConnecting: true
    }))
    .handleAction(WebSocketActions.connected, state => ({
        ...state,
        isConnected: true,
        isConnecting: false
    }))
    .handleAction(WebSocketActions.authenticate, state => {
        if (!state.isConnected) {
            return state;
        }
        return {
            ...state,
            isAuthenticating: true
        };
    })
    .handleAction(WebSocketActions.authenticated, (state, action) => {
        if (!state.isConnected || !state.isAuthenticating) {
            return state;
        }
        return {
            ...state,
            isAuthenticating: false,
            isAuthenticated: true,
            connectionId: action.payload.connectionId
        };
    })
    .handleAction(WebSocketActions.disconnect, state => {
        if (!(state.isConnected || state.isConnecting)) {
            return state;
        }
        return {
            ...state,
            isDisconnecting: true,
        };
    })
    .handleAction(WebSocketActions.disconnected, state => ({
        ...state,
        isConnected: false,
        isDisconnecting: false,
        isAuthenticating: false,
        isAuthenticated: false,
        connectionId: undefined
    }));