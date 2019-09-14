import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const UiShowsActions = {
    addStart: createEmptyAction('@ui/shows/START'),
    addEnd: createEmptyAction('@ui/shows/END'),
    addRequest: createEmptyAction('@ui/shows/REQUEST'),
    addSuccess: createAction('@ui/shows/SUCCESS', action => (showId: string) => action({showId})),
    addFailure: createAction('@ui/shows/FAILURE', action => (error: string) => action({error})),
};

export type UiShowsAction = ActionType<typeof UiShowsActions>;