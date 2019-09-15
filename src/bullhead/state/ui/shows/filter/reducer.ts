import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {ShowsFilterAction, ShowsFilterActions} from './actions';

export const filterReducer = createReducer<string, ShowsFilterAction>('')
    .handleAction(ShowsFilterActions.setFilter, (state, action) => action.payload.filter);

export const favoritesOnlyReducer = createReducer<boolean, ShowsFilterAction>(false)
    .handleAction(ShowsFilterActions.setFavoritesOnly, (state, action) => action.payload.favoritesOnly);

export const showsFilterReducer = combineReducers({
    filter: filterReducer,
    favoritesOnly: favoritesOnlyReducer
});