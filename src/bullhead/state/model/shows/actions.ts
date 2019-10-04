import {ActionType, createAction} from 'typesafe-actions';
import {Show, ShowCollection} from '../../../model/Show';

export const ShowModelActions = {
    setAll: createAction('@model/shows/SET_ALL', action => (shows: ShowCollection) =>
        action({shows})
    ),

    set: createAction('@model/shows/SET', action => (show: Show) =>
        action({show})
    ),

    remove: createAction('@model/shows/REMOVE', action => (showId: string) =>
        action({showId})
    )
};

export type ShowModelAction = ActionType<typeof ShowModelActions>;