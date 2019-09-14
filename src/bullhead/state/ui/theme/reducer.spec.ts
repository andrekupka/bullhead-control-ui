import {ThemeActions} from './actions';
import {themeReducer} from './reducer';

describe('theme reducer', () => {
    it('should return dark as initial state', () => {
        const state = themeReducer(undefined, {} as any);

        expect(state).toEqual({
            isDark: true
        });
    });

    it('should toggle dark to light on TOGGLE_THEME action', () => {
        const state = themeReducer({
            isDark: true
        }, ThemeActions.toggle());

        expect(state).toEqual({
            isDark: false
        });
    });

    it('should toggle light to dark on TOGGLE_THEME action', () => {
        const state = themeReducer({
            isDark: false
        }, ThemeActions.toggle());

        expect(state).toEqual({
            isDark: true
        });
    });
});