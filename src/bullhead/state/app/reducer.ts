import {combineReducers} from 'redux';
import {appShowsReducer} from './shows/reducer';
import {initializationReducer} from "./initialization/reducer";
import {appVisualsReducer} from "./visuals/reducer";
import {httpReducer} from './http/reducer';
import {appGroupsReducer} from './groups/reducer';

export const appReducer = combineReducers({
    groups: appGroupsReducer,
    http: httpReducer,
    initialization: initializationReducer,
    shows: appShowsReducer,
    visuals: appVisualsReducer
});