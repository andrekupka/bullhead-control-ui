import {ResetActions} from '../../reset/actions';
import {UiShowDetailsActions} from './actions';
import {uiShowDetailsReducer, visualsFilterReducer} from './reducer';

describe('ui show details reducer', () => {
    describe('visual filter reducer', () => {
        it('should return no filter as initial state', () => {
            const state = visualsFilterReducer(undefined, {} as any);
            expect(state).toEqual('');
        });

        it('should set filter to supplied value', () => {
            const state = visualsFilterReducer('', UiShowDetailsActions.setVisualsFilter('Stripe'));
            expect(state).toEqual('Stripe');
        });
    });

    it('should be reset aware', () => {
        const initialState = uiShowDetailsReducer(undefined, {} as any);
        const state = uiShowDetailsReducer(initialState, UiShowDetailsActions.setVisualsFilter('Test'));

        const resetState = uiShowDetailsReducer(state, ResetActions.reset());

        expect(resetState).toEqual(initialState);
    });
});