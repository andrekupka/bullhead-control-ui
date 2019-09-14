import {authenticationClear, authenticationLost} from '../../authentication/actions';
import {ShowsActions} from './actions';
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

        const state = showsReducer(undefined, ShowsActions.initialize([show]));

        expect(state).toEqual({
            [show.id]: show
        });
    });

    it('should insert show on add show action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const newShow = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, ShowsActions.add(newShow));

        expect(state).toEqual({
            [show.id]: show,
            [newShow.id]: newShow
        });

    });
});