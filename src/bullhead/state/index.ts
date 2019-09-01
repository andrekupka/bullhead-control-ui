import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducer';

export const lightBullReducer = combineReducers({
    theme: themeReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;