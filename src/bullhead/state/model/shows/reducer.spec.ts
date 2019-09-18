import {AuthenticationActions} from '../../authentication/actions';
import {ResetActions} from '../../reset/actions';
import {ShowModelActions} from './actions';
import {showsReducer} from './reducer';

describe('shows reducer', () => {
    it('should return empty show map as initial state', () => {
        const state = showsReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it('should initialize shows on initialize shows action', () => {
        const show = {
            id: '1',
            name: 'Special Show',
            favorite: true
        };

        const state = showsReducer(undefined, ShowModelActions.initialize([show]));

        expect(state).toEqual({
            [show.id]: show
        });
    });

    it('should insert show on add show action', () => {
        const show = {
            id: '1',
            name: 'Special Show',
            favorite: false
        };

        const newShow = {
            id: '1',
            name: 'Special Show',
            favorite: true
        };

        const state = showsReducer({[show.id]: show}, ShowModelActions.add(newShow));

        expect(state).toEqual({
            [show.id]: show,
            [newShow.id]: newShow
        });

    });
});