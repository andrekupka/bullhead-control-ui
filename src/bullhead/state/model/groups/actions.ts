import {ActionType, createAction} from 'typesafe-actions';
import {Group, GroupCollection, GroupWithParameterIds} from '../../../model/Group';

export const GroupModelActions = {
    setAll: createAction('@model/groups/SET_ALL', action => (groups: GroupCollection) =>
        action({groups})
    ),
    add: createAction('@model/groups/ADD', action => (group: GroupWithParameterIds) =>
        action({group})
    )
};

export type GroupModelAction = ActionType<typeof GroupModelActions>;