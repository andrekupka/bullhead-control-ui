import {ActionType, createAction} from 'typesafe-actions';
import {Show, ShowCollection} from '../../../model/Show';

export const ShowModelActions = {
    initialize: createAction('@model/shows/INITIALIZE', action => (shows: ShowCollection) =>
        action({shows})
    ),

    add: createAction('@model/shows/ADD', action => (show: Show) =>
        action({show})
    ),

    update: createAction('@model/shows/UPDATE', action => (show: Show) =>
        action({show})
    )
};

export type ShowModelAction = ActionType<typeof ShowModelActions>;