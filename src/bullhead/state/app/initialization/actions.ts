import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';
import {InitializableType} from "./reducer";

export const InitializationActions = {
    enable: createEmptyAction('@app/initialization/ENABLE'),
    disable: createEmptyAction('@app/initialization/DISABLE'),
    request: createAction('@app/initialization/REQUEST', action => (type: InitializableType) => action({type})),
    success: createAction('@app/initialization/SUCCESS', action => (type: InitializableType) => action({type})),
    failure: createAction('@app/initialization/FAILURE', action => (type: InitializableType) => action({type})),
};

export type InitializationAction = ActionType<typeof InitializationActions>;
