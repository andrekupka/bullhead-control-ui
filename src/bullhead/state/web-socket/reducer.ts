import {
    WEB_SOCKET_AUTHENTICATED,
    WEB_SOCKET_AUTHENTICATING,
    WEB_SOCKET_CONNECTED,
    WEB_SOCKET_CONNECTING,
    WEB_SOCKET_DISCONNECTED,
    WEB_SOCKET_DISCONNECTING,
    WebSocketActionTypes
} from './actions';

export interface WebSocketState {
    isConnected: boolean;
    isAuthenticating: boolean;
    isAuthenticated: boolean;
    isConnecting: boolean;
    isDisconnecting: boolean;
}

const INITIAL_STATE: WebSocketState = {
    isConnecting: false,
    isConnected: false,
    isAuthenticating: false,
    isAuthenticated: false,
    isDisconnecting: false,
};

export const webSocketReducer = (state: WebSocketState = INITIAL_STATE, action: WebSocketActionTypes): WebSocketState => {
    switch (action.type) {
        case WEB_SOCKET_CONNECTING:
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
        case WEB_SOCKET_AUTHENTICATING:
            return {
                ...state,
                isAuthenticating: true
            };
        case WEB_SOCKET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true
            };
        case WEB_SOCKET_DISCONNECTING:
            return {
                ...state,
                isDisconnecting: false,
            };
        case WEB_SOCKET_DISCONNECTED:
            return {
                ...state,
                isConnected: false,
                isDisconnecting: true,
                isAuthenticating: false,
                isAuthenticated: false
            };
        default:
            return state;
    }
};
