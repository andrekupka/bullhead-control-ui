import {UiShowActions} from './actions';
import {createModeActiveReducer, favoritesOnlyReducer, filterReducer} from './reducer';

describe('ui shows reducer', () => {
    describe('filter reducer', () => {
        it('should return no filter as initial state', () => {
            const state = filterReducer(undefined, {} as any);
            expect(state).toEqual('');
        });

        it('should set filter to supplied value', () => {
            const state = filterReducer('', UiShowActions.setFilter('Heavy'));
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
});