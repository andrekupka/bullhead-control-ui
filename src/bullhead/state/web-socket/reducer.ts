import {
    WEB_SOCKET_CONNECTED,
    WEB_SOCKET_CONNECTING,
    WEB_SOCKET_DISCONNECTED,
    WEB_SOCKET_DISCONNECTING,
    WebSocketActionTypes
} from './actions';

export interface WebSocketState {
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnecting: boolean;
}

const INITIAL_STATE: WebSocketState = {
    isConnected: false,
    isConnecting: false,
    isDisconnecting: false
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
        case WEB_SOCKET_DISCONNECTING:
            return {
                ...state,
                isDisconnecting: false
            };
        case WEB_SOCKET_DISCONNECTED:
            return {
                ...state,
                isConnected: false,
                isDisconnecting: true
            };
        default:
            return state;
    }
};