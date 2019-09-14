import {createReducer} from 'typesafe-actions';
import {ShowMap} from '../../../model/Show';
import {createResettingReducer, ResetAware} from '../../reducer-utils';
import {ShowsActions, ShowsAction} from './actions';

export type ShowsState = ShowMap;

const INITIAL_STATE: ShowsState = {};

const pureShowsReducer = createReducer<ShowsState, ResetAware<ShowsAction>>(INITIAL_STATE)
    .handleAction(ShowsActions.initialize, (state, action) => action.payload.shows.reduce((acc: ShowsState, val) => {
        acc[val.id] = val;
        return acc;
    }, {}))
    .handleAction(ShowsActions.add, (state, action) => ({
        ...state,
        [action.payload.show.id]: action.payload.show
    }));

export const showsReducer = createResettingReducer(pureShowsReducer);