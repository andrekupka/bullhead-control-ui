import {combineReducers} from 'redux';
import {themeReducer} from './theme/themeReducer';

export const bullheadReducer = combineReducers({
    theme: themeReducer
});

export type BullheadState = ReturnType<typeof bullheadReducer>;