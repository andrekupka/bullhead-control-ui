import {ActionType, createAction} from 'typesafe-actions';
import {Group, GroupCollection} from '../../../model/Group';

export const GroupModelActions = {
    setAll: createAction('@model/groups/SET_ALL', action => (groups: GroupCollection) =>
        action({groups})
    ),
    add: createAction('@model/groups/ADD', action => (group: Group) =>
        action({group})
    )
};

export type GroupModelAction = ActionType<typeof GroupModelActions>;