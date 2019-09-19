import {createReducer} from 'typesafe-actions';
import {SnackbarMessageWithId} from '../../../model/SnackbarMessage';
import {asResetAwareReducer, ResetAware} from '../../reset/reset-aware-utils';
import {MessagesAction, MessagesActions} from './actions';

interface MessagesState {
    messages: Array<SnackbarMessageWithId>;
    dropTimerId?: ReturnType<typeof setTimeout>;
    dropMessageId?: string;
}

const INITIAL_STATE: MessagesState = {
    messages: []
};

export const pureMessagesReducer = createReducer<MessagesState, ResetAware<MessagesAction>>(INITIAL_STATE)
    .handleAction(MessagesActions.push, (state, action) => ({
        ...state,
        messages: [...state.messages, action.payload.message]
    }))
    .handleAction(MessagesActions.drop, (state, action) => {
        if (state.messages.length > 0 && state.messages[0].id === action.payload.messageId) {
            return {
                ...state,
                messages: state.messages.slice(1)
            };
        }
        return state;
    })
    .handleAction(MessagesActions.startTimer, (state, action) => ({
        ...state,
        dropTimerId: action.payload.timerId,
        dropMessageId: action.payload.messageId
    }))
    .handleAction(MessagesActions.clearTimer, state => ({
        messages: state.messages
    }));

export const messagesReducer = asResetAwareReducer(pureMessagesReducer);