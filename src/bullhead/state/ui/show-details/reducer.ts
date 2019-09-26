import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import {asResetAwareReducer} from '../../reset/reset-aware-utils';
import {UiShowDetailsAction, UiShowDetailsActions} from './actions';

export const visualsFilterReducer = createReducer<string, UiShowDetailsAction>('')
    .handleAction(UiShowDetailsActions.setVisualsFilter, (state, action) => action.payload.filter);

export const uiShowDetailsReducer = asResetAwareReducer(combineReducers({
    filter: visualsFilterReducer
}));