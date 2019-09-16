import {UiShowActions} from './actions';
import {createModeActiveReducer, favoritesOnlyReducer, filterReducer} from './reducer';

describe('ui shows reducer', () => {
    describe('create mode active reducer', () => {
        it('should return false as initial state', () => {
            const state = createModeActiveReducer(undefined, {} as any);
            expect(state).toEqual(false);
        });

        it ('should enable create mode on start action', () => {
            const state = createModeActiveReducer(false, UiShowActions.startCreate());
            expect(state).toEqual(true);
        });

        it ('should disable create mode on finish action', () => {
            const state = createModeActiveReducer(true, UiShowActions.finishCreate());
            expect(state).toEqual(false);
        });
    });

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