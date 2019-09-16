import {AuthenticationActions} from '../../authentication/actions';
import {ShowModelActions} from './actions';
import {showsReducer} from './reducer';

describe('shows reducer', () => {
    it('should return empty show map as initial state', () => {
        const state = showsReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it('should return initial state if authentication is lost', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, AuthenticationActions.lost());

        expect(state).toEqual({});
    });


    it('should return initial state if authentication is cleared', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer({[show.id]: show}, AuthenticationActions.clear());

        expect(state).toEqual({});
    });

    it('should initialize shows on initialize shows action', () => {
        const show = {
            id: '1',
            name: 'Special Show'
        };

        const state = showsReducer(undefined, ShowModelActions.initialize([show]));

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

        const state = showsReducer({[show.id]: show}, ShowModelActions.add(newShow));

        expect(state).toEqual({
            [show.id]: show,
            [newShow.id]: newShow
        });

    });
});