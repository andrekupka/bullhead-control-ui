import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const UiShowActions = {
    startCreate: createEmptyAction('@ui/shows/START_CREATE'),
    finishCreate: createEmptyAction('@ui/shows/FINISH_CREATE'),
    setFilter: createAction('@ui/shows/SET_FILTER', action => (filter: string) => action({filter})),
    setFavoritesOnly: createAction('@ui/shows/SET_FAVORITES_ONLY',
        action => (favoritesOnly: boolean) => action({favoritesOnly}))
};

export type UiShowAction = ActionType<typeof UiShowActions>;