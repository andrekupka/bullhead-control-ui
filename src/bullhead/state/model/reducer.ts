import {combineReducers} from 'redux';
import {asResetAwareReducer} from '../reset/reset-aware-utils';
import {configReducer} from "./config/reducer";
import {showsReducer} from './shows/reducer';
import {visualsReducer} from './visuals/reducer';
import {groupsReducer} from './groups/reducer';
import {parametersReducer} from './parameters/reducer';

export const modelReducer = asResetAwareReducer(combineReducers({
    config: configReducer,
    groups: groupsReducer,
    parameters: parametersReducer,
    shows: showsReducer,
    visuals: visualsReducer,
}));
