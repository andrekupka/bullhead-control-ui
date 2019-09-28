import {ActionType} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const InitializationActions = {
    enable: createEmptyAction('@app/initialization/ENABLE'),
    disable: createEmptyAction('@app/initialization/DISABLE')
};

export type InitializationAction = ActionType<typeof InitializationActions>;
