import {createReducer} from 'typesafe-actions';
import {VisualCreationAction, VisualCreationActions} from './actions';

export interface VisualCreationState {
    isPending: boolean;
    newVisualId?: string;
    error?: string;
}

const INITIAL_STATE: VisualCreationState = {
    isPending: false
};

export const visualCreationReducer = createReducer<VisualCreationState, VisualCreationAction>(INITIAL_STATE)
    .handleAction(VisualCreationActions.request, () => ({
        isPending: true,
        newVisualId: undefined,
        error: undefined
    }))
    .handleAction(VisualCreationActions.success, (state, action) => ({
        isPending: false,
        newVisualId: action.payload.visualId
    }))
    .handleAction(VisualCreationActions.failure, (state, action) => ({
        isPending: false,
        error: action.payload.error
    }))
    .handleAction(VisualCreationActions.reset, () => INITIAL_STATE);