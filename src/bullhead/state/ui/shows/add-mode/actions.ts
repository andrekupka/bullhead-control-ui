import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const ShowAddModeActions = {
    addStart: createEmptyAction('@ui/shows/add-mode/START'),
    addEnd: createEmptyAction('@ui/shows/add-mode/END'),
    addRequest: createEmptyAction('@ui/shows/add-mode/REQUEST'),
    addSuccess: createAction('@ui/shows/add-mode/SUCCESS', action => (showId: string) => action({showId})),
    addFailure: createAction('@ui/shows/add-mode/FAILURE', action => (error: string) => action({error})),
};

export type ShowAddModeAction = ActionType<typeof ShowAddModeActions>;