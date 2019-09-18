import {Dispatch} from 'react';
import uuidv4 from 'uuid/v4';
import {SnackbarMessage, SnackbarMessageWithId} from '../../../model/SnackbarMessage';
import {LightBullState} from '../../index';
import {MessagesAction, MessagesActions} from './actions';

export const showMessage = (message: SnackbarMessage) => (dispatch: Dispatch<MessagesAction>, getState: () => LightBullState) => {
    const dropMessageOnTimer = (messageId: string) => {
        const {messages} = getState().ui.messages;
        if (messages.length > 1) {
            const nextMessage = messages[1];
            const timerId = setTimeout(() => dropMessageOnTimer(nextMessage.id), 2000);
            dispatch(MessagesActions.startTimer(nextMessage.id, timerId));
        } else {
            dispatch(MessagesActions.clearTimer());
        }
        dispatch(MessagesActions.drop(messageId));
    };

    const pushMessageAndSetupTimer = () => {
        const messageId = uuidv4();
        const messageWithId: SnackbarMessageWithId = {
            ...message,
            id: messageId
        };

        dispatch(MessagesActions.push(messageWithId));

        const {dropTimerId} = getState().ui.messages;
        if (dropTimerId === undefined) {
            const timerId = setTimeout(() => dropMessageOnTimer(messageId), 2000);
            dispatch(MessagesActions.startTimer(messageId, timerId));
        }
    };

    pushMessageAndSetupTimer();
};