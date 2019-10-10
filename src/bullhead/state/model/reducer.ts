import {combineReducers} from 'redux';
import {asResetAwareReducer} from '../reset/reset-aware-utils';
import {configReducer} from "./config/reducer";
import {showsReducer} from './shows/reducer';
import {visualsReducer} from './visuals/reducer';
import {groupsReducer} from './groups/reducer';

export const modelReducer = asResetAwareReducer(combineReducers({
    config: configReducer,
    shows: showsReducer,
    visuals: visualsReducer,
    groups: groupsReducer
}));
