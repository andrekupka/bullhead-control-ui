import {ActionType, createAction} from 'typesafe-actions';

export const ShowsFilterActions = {
    setFilter: createAction('@ui/shows/filter/SET_FILTER', action => (filter: string) => action({filter})),
    setFavoritesOnly: createAction('@ui/shows/filter/SET_FAVORITES_ONLY',
        action => (favoritesOnly: boolean) => action({favoritesOnly}))
};

export type ShowsFilterAction = ActionType<typeof ShowsFilterActions>;