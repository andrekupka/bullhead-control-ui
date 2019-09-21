import {ResetActions} from '../../reset/actions';
import {UiShowActions} from './actions';
import {favoritesOnlyReducer, showFilterReducer, uiShowsReducer} from './reducer';

describe('ui shows reducer', () => {
    describe('filter reducer', () => {
        it('should return no filter as initial state', () => {
            const state = showFilterReducer(undefined, {} as any);
            expect(state).toEqual('');
        });

        it('should set filter to supplied value', () => {
            const state = showFilterReducer('', UiShowActions.setShowFilter('Heavy'));
            expect(state).toEqual('Heavy');
        })
    });

    describe('favorites only reducer', () => {
        it('should return false as initial state', () => {
            const state = favoritesOnlyReducer(undefined, {} as any);
            expect(state).toEqual(false);
        });

        it ('should set favorites only to supplied value', () => {
            const state = favoritesOnlyReducer(false, UiShowActions.setFavoritesOnly(true));
            expect(state).toEqual(true);
        });
    });

    it('should be reset aware', () => {
        const initialState = uiShowsReducer(undefined, {} as any);
        const state = uiShowsReducer(initialState, UiShowActions.setShowFilter('Test'));

        const resetState = uiShowsReducer(state, ResetActions.reset());

        expect(resetState).toEqual(initialState);
    });
});