import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {VisualAction, VisualActions} from './actions';

export const newVisualIdReducer = createReducer<string | null, VisualAction>(null)
    .handleAction(VisualActions.setNewVisualId, (state, action) => action.payload.newVisualId)
    .handleAction(VisualActions.resetNewVisualId, () => null);

export const appVisualsReducer = combineReducers({
    newVisualId: newVisualIdReducer
});