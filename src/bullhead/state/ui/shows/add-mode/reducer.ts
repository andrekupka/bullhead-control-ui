import {createResettingReducer, ResetAware} from '../../../reducer-utils';
import {ShowAddModeAction, ShowAddModeActions} from './actions';
import {createReducer} from 'typesafe-actions';

export interface ShowAddModeState {
    isActive: boolean;
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_STATE: ShowAddModeState = {
    isActive: false,
    isPending: false
};

export const showsAddModeReducer = createReducer<ShowAddModeState, ResetAware<ShowAddModeAction>>(INITIAL_STATE)
    .handleAction(ShowAddModeActions.addStart, state => ({
        ...state,
        isActive: true,
        isPending: false,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(ShowAddModeActions.addEnd, state => ({
        ...state,
        isActive: false,
        isPending: false,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(ShowAddModeActions.addRequest, state => ({
        ...state,
        isPending: true
    }))
    .handleAction(ShowAddModeActions.addSuccess, (state, action) => ({
        ...state,
        isPending: false,
        newShowId: action.payload.showId
    }))
    .handleAction(ShowAddModeActions.addFailure, (state, action) => ({
        ...state,
        isPending: false,
        error: action.payload.error
    }));