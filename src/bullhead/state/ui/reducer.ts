import {combineReducers} from 'redux';
import {messagesReducer} from './messages/reducer';
import {navigationReducer} from './navigation/reducer';
import {uiShowsReducer} from './shows/reducer';
import {themeReducer} from './theme/reducer';

export const uiReducer = combineReducers({
    messages: messagesReducer,
    navigation: navigationReducer,
    shows: uiShowsReducer,
    theme: themeReducer
});