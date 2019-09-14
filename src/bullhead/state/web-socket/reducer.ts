import {createReducer} from 'typesafe-actions';
import {WebSocketAction, WebSocketActions} from './actions';

export interface WebSocketState {
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnecting: boolean;
}

export const INITIAL_STATE: WebSocketState = {
    isConnecting: false,
    isConnected: false,
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
    }));