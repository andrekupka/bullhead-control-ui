import {ActionType, createAction} from 'typesafe-actions';
import {SnackbarMessageWithId} from '../../../model/SnackbarMessage';
import {createEmptyAction} from '../../action-utils';

export const MessagesActions = {
    push: createAction('@ui/messages/PUSH',
        action => (message: SnackbarMessageWithId) => action({message})),

    drop: createAction('@ui/messages/DROP',
        action => (messageId: string) => action({messageId})),

    startTimer: createAction('@ui/messages/START_TIMER',
        action => (messageId: string, timerId: ReturnType<typeof setTimeout>) => action({messageId, timerId})),

    clearTimer: createEmptyAction('@ui/messages/CLEAR_TIMER')
};

export type MessagesAction = ActionType<typeof MessagesActions>;
