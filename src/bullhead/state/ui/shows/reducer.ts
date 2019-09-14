import {createResettingReducer, ResetAware} from '../../reducer-utils';
import {UiShowsAction, UiShowsActions} from './actions';
import {createReducer} from 'typesafe-actions';

export interface UiShowsState {
    isActive: boolean;
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_STATE: UiShowsState = {
    isActive: false,
    isPending: false
};

export const pureUiShowsReducer = createReducer<UiShowsState, ResetAware<UiShowsAction>>(INITIAL_STATE)
    .handleAction(UiShowsActions.addStart, state => ({
        ...state,
        isActive: true,
        isPending: false,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(UiShowsActions.addEnd, state => ({
        ...state,
        isActive: false,
        isPending: false,
        newShowId: undefined,
        error: undefined
    }))
    .handleAction(UiShowsActions.addRequest, state => ({
        ...state,
        isPending: true
    }))
    .handleAction(UiShowsActions.addSuccess, (state, action) => ({
        ...state,
        isPending: false,
        newShowId: action.payload.showId
    }))
    .handleAction(UiShowsActions.addFailure, (state, action) => ({
        ...state,
        isPending: false,
        error: action.payload.error
    }));

export const uiShowsReducer = createResettingReducer(pureUiShowsReducer);