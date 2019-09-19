import {createReducer} from 'typesafe-actions';
import {ShowMap} from '../../../model/Show';
import {ShowModelAction, ShowModelActions} from './actions';

export type ShowsState = ShowMap;

const INITIAL_STATE: ShowsState = {};

export const showsReducer = createReducer<ShowsState, ShowModelAction>(INITIAL_STATE)
    .handleAction(ShowModelActions.initialize, (state, action) =>
        action.payload.shows.reduce((acc: ShowsState, show) => {
            acc[show.id] = show;
            return acc;
        }, {})
    )
    .handleAction(ShowModelActions.add, (state, action) => ({
        ...state,
        [action.payload.show.id]: action.payload.show
    }))
    .handleAction(ShowModelActions.update, (state, action) => {
        const updatedShow = action.payload.show;
        const currentShow = state[updatedShow.id];
        if (currentShow) {
            return {
                ...state,
                [updatedShow.id]: updatedShow
            };
        }
        return state;
    });