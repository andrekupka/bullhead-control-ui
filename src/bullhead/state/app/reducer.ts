import {combineReducers} from 'redux';
import {appShowsReducer} from './shows/reducer';

export const appReducer = combineReducers({
    shows: appShowsReducer
});