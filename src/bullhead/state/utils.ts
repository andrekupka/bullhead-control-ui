import {Action, Reducer} from 'redux';
import {WEB_SOCKET_DISCONNECTED, WebSocketActionTypes} from './web-socket/actions';
import {AUTHENTICATION_CLEAR, AUTHENTICATION_LOST, DeauthenticationActionTypes} from './authentication/actions';

export type ResetAware<A extends Action> = A | DeauthenticationActionTypes | WebSocketActionTypes;

export const createResettingReducer = <S, A extends Action>(reducer: Reducer<S, ResetAware<A>>)
        : Reducer<S, ResetAware<A>> => {
    return (state, action) => {
        switch (action.type) {
            case AUTHENTICATION_CLEAR:
            case AUTHENTICATION_LOST:
            case WEB_SOCKET_DISCONNECTED:
                return reducer(undefined, action);
            default:
                return reducer(state, action);
        }
    };
};
