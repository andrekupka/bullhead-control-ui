import {createReducer} from 'typesafe-actions';
import {ShowMap} from '../../../model/Show';
import {ShowModelActions} from './actions';
import {VisualModelActions} from '../visuals/actions';
import {ModelAction, ModelActions} from '../actions';

export type ShowsState = ShowMap;

const INITIAL_STATE: ShowsState = {};

export const showsReducer = createReducer<ShowsState, ModelAction>(INITIAL_STATE)
    .handleAction(ShowModelActions.setAll, (state, action) =>
        action.payload.shows.reduce((acc: ShowsState, show) => {
            acc[show.id] = show;
            return acc;
        }, {})
    )
    .handleAction(ShowModelActions.set, (state, action) => ({
        ...state,
        [action.payload.show.id]: action.payload.show
    }))
    .handleAction(ModelActions.removeRecursive, (state, action) => {
        const {recursiveIds, model, modelId, parentId} = action.payload;
        if (model === 'visual' && parentId) {
            const show = state[parentId];
            return {
                ...state,
                [show.id]: {
                    ...show,
                    visualIds: show.visualIds.filter(visualId => visualId !== modelId)
                }
            }
        }

        const showIds = recursiveIds['show'];
        if (showIds) {
            const newState = {...state};
            showIds.forEach(showId => {
                delete newState[showId.id];
            });
            return newState;
        }

        return state;
    })
    .handleAction(VisualModelActions.add, (state, action) => {
        const visual = action.payload.visual;
        const showId = visual.showId;
        const show = state[showId];
        if (show) {
            const newVisuals = [...show.visualIds, visual.id];
            return {
                ...state,
                [showId]: {
                    ...show,
                    visualIds: newVisuals
                }
            };
        }
        return state;
    });