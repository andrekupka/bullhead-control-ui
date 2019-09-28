import {createReducer} from 'typesafe-actions';
import {ShowsAction, ShowsActions} from './actions';

export interface ShowsState {
    newShowId?: string;
}

const INITIAL_STATE: ShowsState = {};

export const appShowsReducer = createReducer<ShowsState, ShowsAction>(INITIAL_STATE)
    .handleAction(ShowsActions.setNewShowId, (state, action) => ({
        newShowId: action.payload.showId
    }))
    .handleAction(ShowsActions.resetNewShowId, () => INITIAL_STATE);