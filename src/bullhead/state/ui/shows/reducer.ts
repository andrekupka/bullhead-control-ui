import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {asResetAwareReducer} from '../../reset/reset-aware-utils';
import {UiShowAction, UiShowActions} from './actions';
import {createLoadingStateReducer} from "../loading/reducer";

export const SHOWS_LOADING_STATE = 'shows';

export const showFilterReducer = createReducer<string, UiShowAction>('')
    .handleAction(UiShowActions.setShowFilter, (state, action) => action.payload.filter);

export const favoritesOnlyReducer = createReducer<boolean, UiShowAction>(false)
    .handleAction(UiShowActions.setFavoritesOnly, (state, action) => action.payload.favoritesOnly);

export const uiShowsReducer = asResetAwareReducer(combineReducers({
    loadingState: createLoadingStateReducer(SHOWS_LOADING_STATE),
    showFilter: showFilterReducer,
    favoritesOnly: favoritesOnlyReducer
}));