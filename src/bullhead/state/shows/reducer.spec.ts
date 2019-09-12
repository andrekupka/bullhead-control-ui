import {authenticationClear, authenticationLost} from '../authentication/actions';
import {addShowSuccess, initializeShows} from './actions';
import {showCollectionReducer, showsReducer} from './reducer';

describe('show collection reducer', () => {
    it('should return empty show collection as initial state', () => {
        const state = showCollectionReducer(undefined, {} as any);

        expect(state).toEqual([]);
    });

    it('should return initial state if authentication is lost', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showCollectionReducer([show], authenticationLost() as any);

        expect(state).toEqual([]);
    });


    it('should return initial state if authentication is cleared', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showCollectionReducer([show], authenticationClear());

        expect(state).toEqual([]);
    });

    it('should initialize shows on initialize shows action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showCollectionReducer(undefined, initializeShows([show]));

        expect(state).toEqual([show]);
    });

    it('should append new show on add show success action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const newShow = {
            id: '1',
            name: 'Special Show'
        };

        const state = showCollectionReducer([show], addShowSuccess(newShow));

        expect(state).toEqual([show, newShow]);

    });
});