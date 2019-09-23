import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const ShowCreationActions = {
    request: createEmptyAction('@app/shows/creation/REQUEST'),
    success: createAction('@app/shows/creation/SUCCESS', action => (showId: string) => action({showId})),
    failure: createAction('@app/shows/creation/FAILURE', action => (error: string) => action({error})),
    reset: createEmptyAction('@app/shows/creation/RESET')
};

export type ShowCreationAction = ActionType<typeof ShowCreationActions>;