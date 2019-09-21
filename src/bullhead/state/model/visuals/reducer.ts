import {createReducer} from 'typesafe-actions';
import {VisualMap} from '../../../model/Visual';
import {VisualModelAction, VisualModelActions} from './actions';

export type VisualsState = VisualMap;

const INITIAL_STATE: VisualsState = {};

export const visualsReducer = createReducer<VisualsState, VisualModelAction>(INITIAL_STATE)
    .handleAction(VisualModelActions.initialize,(state, action) =>
        action.payload.visuals.reduce((acc: VisualsState, visual) => {
            acc[visual.id] = visual;
            return acc;
        }, {})
    );