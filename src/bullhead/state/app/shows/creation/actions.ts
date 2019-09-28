import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const ShowCreationActions = {
    setShowId: createAction('@app/shows/creation/SET_SHOW_ID', action => (showId: string) =>
        action({showId})),
    reset: createEmptyAction('@app/shows/creation/RESET')
};

export type ShowCreationAction = ActionType<typeof ShowCreationActions>;