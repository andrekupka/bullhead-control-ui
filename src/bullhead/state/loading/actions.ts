import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';
import {LoadableType} from "./reducer";

export const LoadingActions = {
    enable: createEmptyAction('@loading/ENABLE'),
    disable: createEmptyAction('@loading/DISABLE'),
    request: createAction('@loading/REQUEST', action => (type: LoadableType) => action({type})),
    success: createAction('@loading/SUCCESS', action => (type: LoadableType) => action({type})),
    failure: createAction('@loading/FAILURE', action => (type: LoadableType) => action({type}))
};

export type LoadingAction = ActionType<typeof LoadingActions>;
