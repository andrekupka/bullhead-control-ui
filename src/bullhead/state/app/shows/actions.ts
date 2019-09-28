import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const ShowsActions = {
    setNewShowId: createAction('@app/shows/SET_NEW_SHOW_ID', action => (showId: string) =>
        action({showId})),
    resetNewShowId: createEmptyAction('@app/shows/RESET_NEW_SHOW_ID')
};

export type ShowsAction = ActionType<typeof ShowsActions>;