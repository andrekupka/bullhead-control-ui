import {createReducer} from 'typesafe-actions';
import {ShowCreateAction, ShowCreateActions} from './actions';

export interface ShowCreateState {
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_STATE: ShowCreateState = {
    isPending: false
};

export const showCreateReducer = createReducer<ShowCreateState, ShowCreateAction>(INITIAL_STATE)
    .handleAction(ShowCreateActions.request, () => ({
        isPending: true,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(ShowCreateActions.success, (state, action) => ({
        isPending: false,
        newShowId: action.payload.showId
    }))
    .handleAction(ShowCreateActions.failure, (state, action) => ({
        isPending: false,
        error: action.payload.error
    }))
    .handleAction(ShowCreateActions.reset, () => INITIAL_STATE);