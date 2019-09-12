import {authenticationClear, authenticationLost} from '../authentication/actions';
import {initializeShows} from './actions';
import {showsReducer} from './reducer';

describe('show reducer', () => {
    it ('should return empty show collection as initial state', () => {
        const state = showsReducer(undefined, {} as any);

        expect(state).toEqual({
            collection: []
        });
    });

    it ('should return initial state if authentication is lost', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({collection: [show]}, authenticationLost());

        expect(state).toEqual({
            collection: []
        })
    });

    it ('should return initial state if authentication is cleared', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({collection: [show]}, authenticationClear());

        expect(state).toEqual({
            collection: []
        })
    });

    it ('should initialize shows on initialize shows action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer(undefined, initializeShows([
            show
        ]));

        expect(state).toEqual({
            collection: [show]
        });
    })
});