import {combineReducers} from 'redux';
import {navigationReducer} from './navigation/reducer';
import {uiShowsReducer} from './shows/reducer';
import {themeReducer} from './theme/reducer';

export const uiReducer = combineReducers({
    navigation: navigationReducer,
    shows: uiShowsReducer,
    theme: themeReducer
});