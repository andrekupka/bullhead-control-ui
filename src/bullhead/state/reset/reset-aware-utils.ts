import {Action, Reducer} from 'redux';
import {isActionOf} from 'typesafe-actions';
import {ResetAction, ResetActions} from './actions';

export type ResetAware<A extends Action> = A | ResetAction;

export const asResetAwareReducer = <S, A extends Action>(reducer: Reducer<S, ResetAware<A>>)
    : Reducer<S, ResetAware<A>> => {
    return (state, action) => {
        if (isActionOf(ResetActions.reset, action)) {
            return reducer(undefined, action);
        }
        return reducer(state, action);
    };
};
