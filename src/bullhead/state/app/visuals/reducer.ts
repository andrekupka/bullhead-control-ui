import {visualCreationReducer} from "./creation/reducer";
import {combineReducers} from "redux";

export const appVisualsReducer = combineReducers({
    creation: visualCreationReducer
});