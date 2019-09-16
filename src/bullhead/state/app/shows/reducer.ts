import {showCreateReducer} from './create/reducer';
import { combineReducers } from 'redux';

export const appShowsReducer = combineReducers({
    create: showCreateReducer
});