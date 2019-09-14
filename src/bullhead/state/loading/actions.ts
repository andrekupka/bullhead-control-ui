import {ActionType} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';

export const LoadingActions = {
    enable: createEmptyAction('@loading/ENABLE'),
    disable: createEmptyAction('@loading/DISABLE'),
    showsRequest: createEmptyAction('@loading/SHOWS_REQUEST'),
    showsSuccess: createEmptyAction('@loading/SHOWS_SUCCESS'),
    showsFailure: createEmptyAction('@loading/SHOWS_FAILURE')
};

export type LoadingAction = ActionType<typeof LoadingActions>;