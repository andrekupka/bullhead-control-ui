import {showCreationReducer} from './creation/reducer';
import {combineReducers} from 'redux';
import {showUpdatingReducer} from './updating/reducer';

export const appShowsReducer = combineReducers({
    creation: showCreationReducer,
    updating: showUpdatingReducer
});