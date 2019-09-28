import {createReducer} from 'typesafe-actions';
import {ShowCreationAction, ShowCreationActions} from './actions';

export interface ShowCreationState {
    newShowId?: string;
}

const INITIAL_STATE: ShowCreationState = {};

export const showCreationReducer = createReducer<ShowCreationState, ShowCreationAction>(INITIAL_STATE)
    .handleAction(ShowCreationActions.setShowId, (state, action) => ({
        newShowId: action.payload.showId
    }))
    .handleAction(ShowCreationActions.reset, () => INITIAL_STATE);