import {createReducer} from 'typesafe-actions';
import {ShowMap} from '../../../model/Show';
import {ShowModelActions} from './actions';
import {VisualModelActions} from '../visuals/actions';
import {ModelAction} from '../actions';

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
    .handleAction(ShowModelActions.remove, (state, action) => {
        const newState = {...state};
        delete newState[action.payload.showId];
        return newState;
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