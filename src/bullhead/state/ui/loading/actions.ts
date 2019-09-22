import {ActionType, createAction} from 'typesafe-actions';

export const LoadingActions = {
    enable: createAction('@ui/loading/ENABLE', action => (type: string) => action({type})),
    disable: createAction('@ui/loading/DISABLE', action => (type: string) => action({type})),
    request: createAction('@ui/loading/REQUEST', action => (type: string) => action({type})),
    success: createAction('@ui/loading/SUCCESS', action => (type: string) => action({type})),
    failure: createAction('@ui/loading/FAILURE', action => (type: string) => action({type})),
};

export type LoadingAction = ActionType<typeof LoadingActions>;
