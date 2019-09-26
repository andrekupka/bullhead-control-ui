import {createReducer} from 'typesafe-actions';
import {ShowCreationAction, ShowCreationActions} from './actions';

export interface ShowCreationState {
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_STATE: ShowCreationState = {
    isPending: false
};

export const showCreationReducer = createReducer<ShowCreationState, ShowCreationAction>(INITIAL_STATE)
    .handleAction(ShowCreationActions.request, () => ({
        isPending: true,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(ShowCreationActions.success, (state, action) => ({
        isPending: false,
        newShowId: action.payload.showId
    }))
    .handleAction(ShowCreationActions.failure, (state, action) => ({
        isPending: false,
        error: action.payload.error
    }))
    .handleAction(ShowCreationActions.reset, () => INITIAL_STATE);