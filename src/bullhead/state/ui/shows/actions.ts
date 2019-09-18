import {ActionType, createAction} from 'typesafe-actions';

export const UiShowActions = {
    setFilter: createAction('@ui/shows/SET_FILTER', action => (filter: string) => action({filter})),
    setFavoritesOnly: createAction('@ui/shows/SET_FAVORITES_ONLY',
        action => (favoritesOnly: boolean) => action({favoritesOnly}))
};

export type UiShowAction = ActionType<typeof UiShowActions>;