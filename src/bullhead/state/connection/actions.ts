import {createAction, ActionType} from 'typesafe-actions';
import {LightBullMessage} from '../../types/types';
import {createEmptyAction} from '../action-utils';

export const ConnectionActions = {
    identify: createEmptyAction('@connection/IDENTIFY'),
    identified: createAction('@connection/IDENTIFIED', action => (connectionId: string) => action({connectionId})),
    handleMessage: createAction('@connection/HANDLE_MESSAGE', action => (message: LightBullMessage) => action({message})),
    destroy: createEmptyAction('@connection/DESTROY')
};

export type ConnectionAction = ActionType<typeof ConnectionActions>;

