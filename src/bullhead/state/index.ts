import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducer';
import {navigationReducer} from './navigation/reducer';

export const lightBullReducer = combineReducers({
    theme: themeReducer,
    navigation: navigationReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;