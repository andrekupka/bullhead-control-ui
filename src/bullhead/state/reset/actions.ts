import {ActionType} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';

export const ResetActions = {
    reset: createEmptyAction('@reset/RESET')
};

export type ResetAction = ActionType<typeof ResetActions>;