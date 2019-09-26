import {ShowCreationActions} from './actions';
import {showCreationReducer} from './reducer';

describe('show creation reducer', () => {
    it('should return not pending as initial state', () => {
        const state = showCreationReducer(undefined, {} as any);

        expect(state).toEqual({
            isPending: false
        });
    });

    it ('should switch to pending state on request action', () => {
        const state = showCreationReducer(undefined, ShowCreationActions.request());
        expect(state).toEqual({
            isPending: true
        });
    });

    it ('should reset error and show id on request action', () => {
        const state = showCreationReducer({
            isPending: false,
            newShowId: 'id',
            error: 'error'
        }, ShowCreationActions.request());

        expect(state).toEqual({
            isPending: true
        });
    });

    it('should reset pending and set show id on success action', () => {
        const state = showCreationReducer({
            isPending: true
        }, ShowCreationActions.success('id'));

        expect(state).toEqual({
            isPending: false,
            newShowId: 'id'
        });
    })

    it('should reset pending and set error on failure action', () => {
        const state = showCreationReducer({
            isPending: true
        }, ShowCreationActions.failure('error'));

        expect(state).toEqual({
            isPending: false,
            error: 'error'
        });
    });

    it('should reset to none pending state on reset action', () => {
        const state = showCreationReducer({
            isPending: true,
            newShowId: 'id',
            error: 'error'
        }, ShowCreationActions.reset());

        expect(state).toEqual({
            isPending: false
        });
    })
});