import {
    WEB_SOCKET_AUTHENTICATED,
    WEB_SOCKET_AUTHENTICATE, WEB_SOCKET_CONNECT,
    WEB_SOCKET_CONNECTED,
    WEB_SOCKET_DISCONNECT,
    WEB_SOCKET_DISCONNECTED,
    WebSocketActionTypes
} from './actions';

export interface WebSocketState {
    isConnected: boolean;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    isConnecting: boolean;
    isDisconnecting: boolean;
}

export const INITIAL_STATE: WebSocketState = {
    isConnecting: false,
    isConnected: false,
    isAuthenticating: false,
    isAuthenticated: false,
    isDisconnecting: false,
};

export const webSocketReducer = (state: WebSocketState = INITIAL_STATE, action: WebSocketActionTypes): WebSocketState => {
    switch (action.type) {
        case WEB_SOCKET_CONNECT:
            return {
                ...state,
                isConnecting: true
            };
        case WEB_SOCKET_CONNECTED:
            return {
                ...state,
                isConnected: true,
                isConnecting: false
            };
        case WEB_SOCKET_AUTHENTICATE:
            if (!state.isConnected) {
                return state;
            }
            return {
                ...state,
                isAuthenticating: true
            };
        case WEB_SOCKET_AUTHENTICATED:
            if (!state.isConnected || !state.isAuthenticating) {
                return state;
            }
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true
            };
        case WEB_SOCKET_DISCONNECT:
            if (!state.isConnected) {
                return state;
            }
            return {
                ...state,
                isDisconnecting: true,
            };
        case WEB_SOCKET_DISCONNECTED:
            if (!state.isDisconnecting) {
                return state;
            }
            return {
                ...state,
                isConnected: false,
                isDisconnecting: false,
                isAuthenticating: false,
                isAuthenticated: false
            };
        default:
            return state;
    }
};
