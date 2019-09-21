import {ResetActions} from '../reset/actions';
import {modelReducer} from './reducer';
import {ShowModelActions} from './shows/actions';

describe('model reducer', () => {
    it('should be reset aware', () => {
        const initialState = modelReducer(undefined, {} as any);

        // create some model state with child reducer
        const state = modelReducer(undefined, ShowModelActions.add({
            id: 'id1',
            name: 'Test Show',
            favorite: false,
            visualIds: []
        }));

        const resetState = modelReducer(state, ResetActions.reset());

        expect(resetState).toEqual(initialState);
    });
});