import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const UiShowActions = {
    startAdd: createEmptyAction('@ui/shows/START_ADD'),
    finishAdd: createEmptyAction('@ui/shows/FINISH_ADD'),
    setFilter: createAction('@ui/shows/SET_FILTER', action => (filter: string) => action({filter})),
    setFavoritesOnly: createAction('@ui/shows/SET_FAVORITES_ONLY',
        action => (favoritesOnly: boolean) => action({favoritesOnly}))
};

export type UiShowAction = ActionType<typeof UiShowActions>;