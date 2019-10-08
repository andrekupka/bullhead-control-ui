import {createReducer} from 'typesafe-actions';
import {VisualMap} from '../../../model/Visual';
import {VisualModelActions} from './actions';
import {ModelAction, ModelActions} from '../actions';
import {GroupModelActions} from '../groups/actions';

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
    .handleAction(GroupModelActions.add, (state, action) => {
        const group = action.payload.group;
        const visualId = group.visualId;
        const visual = state[visualId];
        if (visual) {
            return {
                ...state,
                [visualId]: {
                    ...visual,
                    groupIds: [...visual.groupIds, group.id]
                }
            }
        }
        return state;
    })
    .handleAction(ModelActions.removeRecursive, (state, action) => {
        const {relatedIds, model, modelId, parentId} = action.payload;
        if (model === 'group' && parentId) {
            const visual = state[parentId];
            return {
                ...state,
                [visual.id]: {
                    ...visual,
                    groupIds: visual.groupIds.filter(groupId => groupId !== modelId)
                }
            };
        }

        const visualIds = relatedIds['visual'];
        if (visualIds) {
            const newState = {...state};
            visualIds.forEach(visualId => {
                delete newState[visualId.id];
            });
            return newState;
        }
        return state;
    });