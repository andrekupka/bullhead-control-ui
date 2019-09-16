import {createReducer} from 'typesafe-actions';
import {ShowUpdatingAction, ShowUpdatingActions} from './actions';

export type ShowUpdatingState = { [showId: string]: boolean | undefined };

export const showUpdatingReducer = createReducer<ShowUpdatingState, ShowUpdatingAction>({})
    .handleAction(ShowUpdatingActions.request, (state, action) => ({
        ...state,
        [action.payload.showId]: true
    }))
    .handleAction(ShowUpdatingActions.finish, (state, action) => ({
        ...state,
        [action.payload.showId]: undefined
    }));