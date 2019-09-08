import {Reducer, Action} from 'redux';
import {AUTHENTICATION_CLEAR, AUTHENTICATION_LOST} from "./actions";

export const createAuthenticatedReducer = <S, A extends Action>(reducer: Reducer<S, A>): Reducer<S, A> => {
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
