import {combineReducers} from 'redux';
import {createResettingReducer} from '../../reducer-utils';
import {showsAddModeReducer} from './add-mode/reducer';
import {showsFilterReducer} from './filter/reducer';

export const uiShowsReducer = createResettingReducer(combineReducers({
    addMode: showsAddModeReducer,
    filter: showsFilterReducer
}));