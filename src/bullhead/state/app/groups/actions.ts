import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const GroupActions = {
    setNewGroupId: createAction('@app/shows/SET_NEW_GROUP_ID', action => (groupId: string) =>
        action({groupId})),
    resetNewGroupId: createEmptyAction('@app/shows/RESET_NEW_GROUP_ID')
};

export type GroupAction = ActionType<typeof GroupActions>;