import {MessageSharp} from '@material-ui/icons';
import {SnackbarMessageWithId} from '../../../model/SnackbarMessage';
import {ResetActions} from '../../reset/actions';
import {MessagesActions} from './actions';
import {messagesReducer} from './reducer';

const firstMessage: SnackbarMessageWithId = {
    id: '1',
    text: 'First message',
    variant: 'error'
};

const secondMessage: SnackbarMessageWithId = {
    id: '2',
    text: 'Second message',
    variant: 'success'
};


describe('messages reducer', () => {
    it('should return empty messages as initial state', () => {
        const state = messagesReducer(undefined, {} as any);
        expect(state).toEqual({
            messages: []
        });
    });

    it('should be reset aware', () => {
        const state = messagesReducer({
            messages: [firstMessage],
            dropTimerId: 1 as any,
            dropMessageId: 'message'
        }, ResetActions.reset());

        expect(state).toEqual({
            messages: []
        });
    });

    it('should push message on push action', () => {
        const state = messagesReducer({
            messages: []
        }, MessagesActions.push(firstMessage));

        expect(state).toEqual({
            messages: [firstMessage]
        });
    });

    it('should append message to existing ones on push action', () => {
        const state = messagesReducer({
            messages: [firstMessage]
        }, MessagesActions.push(secondMessage));

        expect(state).toEqual({
            messages: [firstMessage, secondMessage]
        });
    });

    it('should ignore drop action when messages are empty', () => {
        const state = messagesReducer({
            messages: []
        }, MessagesActions.drop('1'));

        expect(state).toEqual({
            messages: []
        });
    });

    it('should drop first message on drop action if id is same', () => {
        const state = messagesReducer({
            messages: [firstMessage, secondMessage]
        }, MessagesActions.drop('1'));

        expect(state).toEqual({
            messages: [secondMessage]
        });
    });

    it('should ignore drop action if id of first message is different', () => {
        const state = messagesReducer({
            messages: [firstMessage, secondMessage]
        }, MessagesActions.drop('2'));

        expect(state).toEqual({
            messages: [firstMessage, secondMessage]
        });
    });

    it('should set up timer on start timer action', () => {
        const state = messagesReducer({
            messages: []
        }, MessagesActions.startTimer('1', 2 as any));

        expect(state).toEqual({
            messages: [],
            dropTimerId: 2,
            dropMessageId: '1'
        });
    });

    it('should overwrite existing timer on start timer action', () => {
        const state = messagesReducer({
            messages: [],
            dropTimerId: 2 as any,
            dropMessageId: 'old'
        }, MessagesActions.startTimer('new', 2 as any));

        expect(state).toEqual({
            messages: [],
            dropTimerId: 2,
            dropMessageId: 'new'
        });
    });

    it('should clear timer on clear timer action', () => {
        const state = messagesReducer({
            messages: [],
            dropTimerId: 2 as any,
            dropMessageId: '1'
        }, MessagesActions.clearTimer());

        expect(state).toEqual({
            messages: []
        });
    });

    it('should keep messages on clear timer action', () => {
        const state = messagesReducer({
            messages: [firstMessage]
        }, MessagesActions.clearTimer());

        expect(state).toEqual({
            messages: [firstMessage]
        });
    });
});