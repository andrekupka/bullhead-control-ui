import {combineReducers} from 'redux';
import {asResetAwareReducer} from '../reset/reset-aware-utils';
import {showsReducer} from './shows/reducer';
import {visualsReducer} from './visuals/reducer';

export const modelReducer = asResetAwareReducer(combineReducers({
    shows: showsReducer,
    visuals: visualsReducer,
}));