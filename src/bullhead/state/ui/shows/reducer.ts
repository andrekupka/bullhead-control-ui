import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {asResetAwareReducer} from '../../reset/reset-aware-utils';
import {UiShowAction, UiShowActions} from './actions';

export const showFilterReducer = createReducer<string, UiShowAction>('')
    .handleAction(UiShowActions.setShowFilter, (state, action) => action.payload.filter);

export const favoritesOnlyReducer = createReducer<boolean, UiShowAction>(false)
    .handleAction(UiShowActions.setFavoritesOnly, (state, action) => action.payload.favoritesOnly);

export const uiShowsReducer = asResetAwareReducer(combineReducers({
    showFilter: showFilterReducer,
    favoritesOnly: favoritesOnlyReducer
}));