import {ActionType, createAction} from 'typesafe-actions';

export const UiShowDetailsActions = {
    setVisualsFilter: createAction('@ui/showDetails/SET_VISUALS_FILTER',
            action => (filter: string) => action({filter}))
};

export type UiShowDetailsAction = ActionType<typeof UiShowDetailsActions>;