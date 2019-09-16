import {showCreateReducer} from './create/reducer';
import { combineReducers } from 'redux';
import {showUpdatingReducer} from './updating/reducer';

export const appShowsReducer = combineReducers({
    create: showCreateReducer,
    updating: showUpdatingReducer
});