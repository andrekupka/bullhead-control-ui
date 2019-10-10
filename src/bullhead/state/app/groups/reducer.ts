import {createReducer} from 'typesafe-actions';
import {GroupAction, GroupActions} from './actions';
import {combineReducers} from 'redux';

export const newGroupIdReducer = createReducer<string | null, GroupAction>(null)
    .handleAction(GroupActions.setNewGroupId, (state, action) => action.payload.groupId)
    .handleAction(GroupActions.resetNewGroupId, () => null);

export const appGroupsReducer = combineReducers({
    newGroupId: newGroupIdReducer
});