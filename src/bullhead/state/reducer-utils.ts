import {Action, Reducer} from 'redux';
import {getType} from 'typesafe-actions';
import {AuthenticationAction, AuthenticationActions} from './authentication/actions';
import {WebSocketAction, WebSocketActions} from './web-socket/actions';

export type ResetAware<A extends Action> = A | AuthenticationAction | WebSocketAction;

export const createResettingReducer = <S, A extends Action>(reducer: Reducer<S, ResetAware<A>>)
    : Reducer<S, ResetAware<A>> => {
    return (state, action) => {
        switch (action.type) {
            case getType(AuthenticationActions.clear):
            case getType(AuthenticationActions.lost):
            case getType(WebSocketActions.disconnected):
                return reducer(undefined, action);
            default:
                return reducer(state, action);
        }
    };
};
