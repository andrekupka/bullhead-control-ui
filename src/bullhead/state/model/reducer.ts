import {combineReducers} from 'redux';
import {asResetAwareReducer} from '../reset/reset-aware-utils';
import {showsReducer} from './shows/reducer';

export const modelReducer = asResetAwareReducer(combineReducers({
    shows: showsReducer
}));