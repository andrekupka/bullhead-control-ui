import {uiReducer} from './reducer';
import {showNavigation} from './actions';

describe('ui reducers', () => {
    it('should return closed navigation as initial state', () => {
       const state = uiReducer(undefined, {});

       expect(state).toEqual({
           isNavigationOpen: false
       });
    });

    const testShowNavigationAction = (description: string, action: boolean, initial: boolean, expected: boolean) => {
        it(description, () => {
            const state = uiReducer({
                isNavigationOpen: initial
            }, showNavigation(action));

            expect(state).toEqual({
                isNavigationOpen: expected
            });
        });
    };

    testShowNavigationAction('should open navigation if closed on open action', true, false, true);
    testShowNavigationAction('should close navigation if opened on close action', false, true, false);
    testShowNavigationAction('should keep navigation if opened on open action', true, true, true);
    testShowNavigationAction('should keep navigation if closed on close action', false, false, false);
});