import {createReducer} from 'typesafe-actions';
import {GroupMap} from '../../../model/Group';
import {ModelAction, ModelActions} from '../actions';
import {GroupModelActions} from './actions';

export type GroupsState = GroupMap;

const INITIAL_STATE: GroupsState = {};

export const groupsReducer = createReducer<GroupsState, ModelAction>(INITIAL_STATE)
    .handleAction(GroupModelActions.setAll, (state, action) =>
        action.payload.groups.reduce((acc: GroupsState, group) => {
            acc[group.id] = group;
            return acc;
        }, {})
    )
    .handleAction(GroupModelActions.add, (state, action) => ({
        ...state,
        [action.payload.group.id]: action.payload.group
    }))
    .handleAction(ModelActions.removeRecursive, (state, action) => {
        const groupIds = action.payload.relatedIds['group'];
        if (groupIds) {
            const newState = {...state};
            groupIds.forEach(groupId => {
                delete newState[groupId.id];
            });
            return newState;
        }
        return state;
    });