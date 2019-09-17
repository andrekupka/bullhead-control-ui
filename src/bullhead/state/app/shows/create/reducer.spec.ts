import {ShowCreateActions} from './actions';
import {showCreateReducer} from './reducer';

describe('show create reducer', () => {
    it('should return not pending as initial state', () => {
        const state = showCreateReducer(undefined, {} as any);

        expect(state).toEqual({
            isPending: false
        });
    });

    it ('should switch to pending state on request action', () => {
        const state = showCreateReducer(undefined, ShowCreateActions.request());
        expect(state).toEqual({
            isPending: true
        });
    });

    it ('should reset error and show id on request action', () => {
        const state = showCreateReducer({
            isPending: false,
            newShowId: 'id',
            error: 'error'
        }, ShowCreateActions.request());

        expect(state).toEqual({
            isPending: true
        });
    });

    it('should reset pending and set show id on success action', () => {
        const state = showCreateReducer({
            isPending: true
        }, ShowCreateActions.success('id'));

        expect(state).toEqual({
            isPending: false,
            newShowId: 'id'
        });
    })

    it('should reset pending and set error on failure action', () => {
        const state = showCreateReducer({
            isPending: true
        }, ShowCreateActions.failure('error'));

        expect(state).toEqual({
            isPending: false,
            error: 'error'
        });
    });

    it('should reset to none pending state on reset action', () => {
        const state = showCreateReducer({
            isPending: true,
            newShowId: 'id',
            error: 'error'
        }, ShowCreateActions.reset());

        expect(state).toEqual({
            isPending: false
        });
    })
});