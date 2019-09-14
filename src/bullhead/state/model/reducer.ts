import {combineReducers} from 'redux';
import {createResettingReducer} from '../reducer-utils';
import {showsReducer} from './shows/reducer';

export const modelReducer = createResettingReducer(combineReducers({
    shows: showsReducer
}));