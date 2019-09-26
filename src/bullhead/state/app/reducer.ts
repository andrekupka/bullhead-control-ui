import {combineReducers} from 'redux';
import {appShowsReducer} from './shows/reducer';
import {initializationReducer} from "./initialization/reducer";
import {appVisualsReducer} from "./visuals/reducer";
import {httpReducer} from './http/reducer';

export const appReducer = combineReducers({
    http: httpReducer,
    initialization: initializationReducer,
    shows: appShowsReducer,
    visuals: appVisualsReducer
});