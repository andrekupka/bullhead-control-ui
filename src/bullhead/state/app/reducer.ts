import {combineReducers} from 'redux';
import {appShowsReducer} from './shows/reducer';
import {initializationReducer} from "./initialization/reducer";
import {appVisualsReducer} from "./visuals/reducer";

export const appReducer = combineReducers({
    initialization: initializationReducer,
    shows: appShowsReducer,
    visuals: appVisualsReducer
});