import {createReducer} from 'typesafe-actions';
import {ShowMap} from '../../../model/Show';
import {ShowModelAction, ShowModelActions} from './actions';

export type ShowsState = ShowMap;

const INITIAL_STATE: ShowsState = {};

export const showsReducer = createReducer<ShowsState, ShowModelAction>(INITIAL_STATE)
    .handleAction(ShowModelActions.setAll, (state, action) =>
        action.payload.shows.reduce((acc: ShowsState, show) => {
            acc[show.id] = show;
            return acc;
        }, {})
    )
    .handleAction(ShowModelActions.set, (state, action) => ({
        ...state,
        [action.payload.show.id]: action.payload.show
    }));