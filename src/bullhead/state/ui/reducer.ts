import {combineReducers} from 'redux';
import {navigationReducer} from './navigation/reducer';
import {uiShowsReducer} from './shows/reducer';

export const uiReducer = combineReducers({
    navigation: navigationReducer,
    shows: uiShowsReducer
});