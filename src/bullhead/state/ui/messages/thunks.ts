import {Dispatch} from 'react';
import uuidv4 from 'uuid/v4';
import {SnackbarMessage, SnackbarMessageWithId} from '../../../model/SnackbarMessage';
import {LightBullState} from '../../index';
import {MessagesAction, MessagesActions} from './actions';

const MESSAGE_TIME = 4000;

const dropMessageOnTimer = (dispatch: Dispatch<MessagesAction>, getState: () => LightBullState, messageId: string) => {
    const {messages} = getState().ui.messages;
    if (messages.length > 1) {
        const nextMessage = messages[1];
        const timerId = setTimeout(() => dropMessageOnTimer(dispatch, getState, nextMessage.id), MESSAGE_TIME);
        dispatch(MessagesActions.startTimer(nextMessage.id, timerId));
    } else {
        dispatch(MessagesActions.clearTimer());
    }
    dispatch(MessagesActions.drop(messageId));
};

export const showMessage = (message: SnackbarMessage) => (dispatch: Dispatch<MessagesAction>, getState: () => LightBullState) => {
    const messageId = uuidv4();
    const messageWithId: SnackbarMessageWithId = {
        ...message,
        id: messageId
    };

    dispatch(MessagesActions.push(messageWithId));

    const {dropTimerId} = getState().ui.messages;
    if (dropTimerId === undefined) {
        const timerId = setTimeout(() => dropMessageOnTimer(dispatch, getState, messageId), MESSAGE_TIME);
        dispatch(MessagesActions.startTimer(messageId, timerId));
    }
};

export const closeMessage = (messageId: string) => (dispatch: Dispatch<MessagesAction>, getState: () => LightBullState) => {
    const {messages, dropTimerId} = getState().ui.messages;
    if (messages.length <= 0) {
        return;
    }

    const message = messages[0];
    if (message.id !== messageId) {
        return;
    }

    if (dropTimerId !== undefined) {
        clearTimeout(dropTimerId);
        dispatch(MessagesActions.clearTimer());
    }

    dispatch(MessagesActions.drop(messageId));

    const remainingMessages = getState().ui.messages.messages;
    if (remainingMessages.length <= 0) {
        return;
    }

    const nextMessage = remainingMessages[0];
    const timerId = setTimeout(() => dropMessageOnTimer(dispatch, getState, nextMessage.id), MESSAGE_TIME);
    dispatch(MessagesActions.startTimer(nextMessage.id, timerId));
};

export const showErrorMessage = (message: string) => showMessage({
    text: message,
    variant: 'error'
});

export const showSuccessMessage = (message: string) => showMessage({
    text: message,
    variant: 'success'
});