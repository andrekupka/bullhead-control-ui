import {createReducer} from 'typesafe-actions';
import {VisualCreationAction, VisualCreationActions} from './actions';

export interface VisualCreationState {
    newVisualId?: string;
}

const INITIAL_STATE: VisualCreationState = {};

export const visualCreationReducer = createReducer<VisualCreationState, VisualCreationAction>(INITIAL_STATE)
    .handleAction(VisualCreationActions.setVisualId, (state, action) => ({
        newVisualId: action.payload.visualId
    }))
    .handleAction(VisualCreationActions.reset, () => INITIAL_STATE);