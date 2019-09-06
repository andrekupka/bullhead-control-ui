import {themeReducer} from './reducer';
import {toggleTheme} from './actions';

describe('theme reducer', () => {
    it('should return dark as initial state', () => {
       const state = themeReducer(undefined, {});

       expect(state).toEqual({
           isDark: true
       });
    });

    it('should toggle dark to light on TOGGLE_THEME action', () => {
        const state = themeReducer({
            isDark: true
        }, toggleTheme());

        expect(state).toEqual({
            isDark: false
        });
    });

    it('should toggle light to dark on TOGGLE_THEME action', () => {
        const state = themeReducer({
            isDark: false
        }, toggleTheme());

        expect(state).toEqual({
            isDark: true
        });
    })
});