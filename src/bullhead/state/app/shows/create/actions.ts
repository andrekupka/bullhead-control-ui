import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const ShowCreateActions = {
    request: createEmptyAction('@app/shows/create/REQUEST'),
    success: createAction('@app/shows/create/SUCCESS', action => (showId: string) => action({showId})),
    failure: createAction('@app/shows/create/FAILURE', action => (error: string) => action({error})),
    reset: createEmptyAction('@app/shows/create/RESET')
};

export type ShowCreateAction = ActionType<typeof ShowCreateActions>;