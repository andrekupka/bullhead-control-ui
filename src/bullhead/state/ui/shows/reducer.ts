import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {createResettingReducer} from '../../reducer-utils';
import {UiShowAction, UiShowActions} from './actions';

export const createModeActiveReducer = createReducer<boolean, UiShowAction>(false)
    .handleAction(UiShowActions.startCreate, () => true)
    .handleAction(UiShowActions.finishCreate, () => false);

export const filterReducer = createReducer<string, UiShowAction>('')
    .handleAction(UiShowActions.setFilter, (state, action) => action.payload.filter);

export const favoritesOnlyReducer = createReducer<boolean, UiShowAction>(false)
    .handleAction(UiShowActions.setFavoritesOnly, (state, action) => action.payload.favoritesOnly);

export const uiShowsReducer = createResettingReducer(combineReducers({
    createModeActive: createModeActiveReducer,
    filter: filterReducer,
    favoritesOnly: favoritesOnlyReducer
}));