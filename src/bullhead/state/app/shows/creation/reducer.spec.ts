import {ShowCreationActions} from './actions';
import {showCreationReducer} from './reducer';

describe('show creation reducer', () => {
    it('should return no show id as initial state', () => {
        const state = showCreationReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it ('should set new show id on set show id action', () => {
        const state = showCreationReducer(undefined, ShowCreationActions.setShowId('1'));
        expect(state).toEqual({
            newShowId: '1'
        });
    });

    it ('should reset show id on reset action', () => {
        const state = showCreationReducer({
            newShowId: 'id',
        }, ShowCreationActions.reset());

        expect(state).toEqual({});
    });
});