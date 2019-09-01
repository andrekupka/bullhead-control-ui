import {combineReducers} from 'redux';
import {themeReducer} from './theme/reducer';
import {uiReducer} from './ui/reducer';

export const lightBullReducer = combineReducers({
    theme: themeReducer,
    ui: uiReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;