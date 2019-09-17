import {ActionType, createAction} from 'typesafe-actions';

export const ShowUpdatingActions = {
    request: createAction('@app/shows/updating/REQUEST',
            action => (showId: string) => action({showId})),
    finish: createAction('@app/shows/updating/FINISH',
        action => (showId: string) => action({showId}))
};

export type ShowUpdatingAction = ActionType<typeof ShowUpdatingActions>;