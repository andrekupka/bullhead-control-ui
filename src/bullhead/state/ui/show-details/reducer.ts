import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {asResetAwareReducer} from '../../reset/reset-aware-utils';
import {UiShowDetailsAction, UiShowDetailsActions} from './actions';
import {createLoadingStateReducer} from "../loading/reducer";

export const SHOW_DETAILS_LOADING_STATE = 'shows-details';

export const visualsFilterReducer = createReducer<string, UiShowDetailsAction>('')
    .handleAction(UiShowDetailsActions.setVisualsFilter, (state, action) => action.payload.filter);

export const uiShowDetailsReducer = asResetAwareReducer(combineReducers({
    loadingState: createLoadingStateReducer(SHOW_DETAILS_LOADING_STATE),
    filter: visualsFilterReducer
}));