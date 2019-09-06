import {navigationReducer} from './reducer';
import {showNavigation} from './actions';

describe('navigation reducers', () => {
    it('should return closed navigation as initial state', () => {
       const state = navigationReducer(undefined, {});

       expect(state).toEqual({
           isNavigationOpen: true,
           navigationWidth: 240,
       });
    });

    const testShowNavigationAction = (description: string, action: boolean, initial: boolean, expected: boolean) => {
        it(description, () => {
            const state = navigationReducer({
                isNavigationOpen: initial,
                navigationWidth: 240
            }, showNavigation(action));

            expect(state).toMatchObject({
                isNavigationOpen: expected,
            });
        });
    };

    testShowNavigationAction('should open navigation if closed on open action', true, false, true);
    testShowNavigationAction('should close navigation if opened on close action', false, true, false);
    testShowNavigationAction('should keep navigation if opened on open action', true, true, true);
    testShowNavigationAction('should keep navigation if closed on close action', false, false, false);
});