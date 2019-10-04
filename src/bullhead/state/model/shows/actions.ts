import {ActionType, createAction} from 'typesafe-actions';
import {Show, ShowCollection} from '../../../model/Show';

export const ShowModelActions = {
    setAll: createAction('@model/shows/SET_ALL', action => (shows: ShowCollection) =>
        action({shows})
    ),

    set: createAction('@model/shows/SET', action => (show: Show) =>
        action({show})
    )
};

export type ShowModelAction = ActionType<typeof ShowModelActions>;