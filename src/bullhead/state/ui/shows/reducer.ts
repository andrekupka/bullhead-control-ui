import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {createResettingReducer} from '../../reducer-utils';
import {ShowsFilterAction, ShowsFilterActions} from './actions';
import {showsAddModeReducer} from './add-mode/reducer';

export const filterReducer = createReducer<string, ShowsFilterAction>('')
    .handleAction(ShowsFilterActions.setFilter, (state, action) => action.payload.filter);

export const favoritesOnlyReducer = createReducer<boolean, ShowsFilterAction>(false)
    .handleAction(ShowsFilterActions.setFavoritesOnly, (state, action) => action.payload.favoritesOnly);


export const uiShowsReducer = createResettingReducer(combineReducers({
    addMode: showsAddModeReducer,
    filter: filterReducer,
    favoritesOnly: favoritesOnlyReducer
}));