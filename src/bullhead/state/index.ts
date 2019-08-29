import {combineReducers} from 'redux';
import {reducer} from './theme/reducer';

export const bullheadReducer = combineReducers({
    theme: reducer
});

export type BullheadState = ReturnType<typeof bullheadReducer>;