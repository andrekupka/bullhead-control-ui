import {createReducer} from 'typesafe-actions';
import {VisualMap} from '../../../model/Visual';
import {VisualModelActions} from './actions';
import {ModelAction, ModelActions} from '../actions';

export type VisualsState = VisualMap;

const INITIAL_STATE: VisualsState = {};

export const visualsReducer = createReducer<VisualsState, ModelAction>(INITIAL_STATE)
    .handleAction(VisualModelActions.setAll, (state, action) =>
        action.payload.visuals.reduce((acc: VisualsState, visual) => {
            acc[visual.id] = visual;
            return acc;
        }, {})
    )
    .handleAction([VisualModelActions.add, VisualModelActions.set], (state, action) => ({
        ...state,
        [action.payload.visual.id]: action.payload.visual
    }))
    .handleAction(ModelActions.removeRecursive, (state, action) => {
        const visualIds = action.payload.recursiveIds['visual'];
        if (visualIds) {
            const newState = {...state};
            visualIds.forEach(visualId => {
                delete newState[visualId.id];
            });
            return newState;
        }
        return state;
    });