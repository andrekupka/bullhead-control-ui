import {createReducer} from 'typesafe-actions';
import {ShowsAction, ShowsActions} from './actions';
import {combineReducers} from 'redux';

export const newShowIdReducer = createReducer<string | null, ShowsAction>(null)
    .handleAction(ShowsActions.setNewShowId, (state, action) => action.payload.showId)
    .handleAction(ShowsActions.resetNewShowId, () => null);

export const appShowsReducer = combineReducers({
    newShowId: newShowIdReducer
});