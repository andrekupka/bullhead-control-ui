import {Action, Reducer} from 'redux';
import {AUTHENTICATION_CLEAR, AUTHENTICATION_LOST, DeauthenticationActionTypes} from './actions';

export type DeauthAware<A extends Action> = A | DeauthenticationActionTypes;

export const createAuthenticationAwareReducer = <S, A extends Action>(reducer: Reducer<S, DeauthAware<A>>)
        : Reducer<S, DeauthAware<A>> => {
    return (state, action) => {
        switch (action.type) {
            case AUTHENTICATION_CLEAR:
            case AUTHENTICATION_LOST:
                return reducer(undefined, action);
            default:
                return reducer(state, action);
        }
    };
};
