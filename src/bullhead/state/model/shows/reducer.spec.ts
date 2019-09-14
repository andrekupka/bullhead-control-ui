import {authenticationClear, authenticationLost} from '../../authentication/actions';
import {addShowSuccess} from '../../ui/shows/actions';
import {uiShowsReducer} from '../../ui/shows/reducer';
import {initializeShows, pushShow} from './actions';
import {showsReducer} from './reducer';

describe('ui shows reducer', () => {
    it('should return empty show map as initial state', () => {
        const state = showsReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it('should return initial state if authentication is lost', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, authenticationLost());

        expect(state).toEqual({});
    });


    it('should return initial state if authentication is cleared', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, authenticationClear());

        expect(state).toEqual({});
    });

    it('should initialize shows on initialize shows action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer(undefined, initializeShows([show]));

        expect(state).toEqual({
            [show.id]: show
        });
    });

    it('should insert show on push show action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const newShow = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, pushShow(newShow));

        expect(state).toEqual({
            [show.id]: show,
            [newShow.id]: newShow
        });

    });
});