export const TOGGLE_THEME_TYPE = 'TOGGLE_THEME';

export interface ToggleThemeAction {
    type: typeof TOGGLE_THEME_TYPE,
}

export type ThemeActionTypes = ToggleThemeAction;

export const toggleTheme = (): ThemeActionTypes => ({
    type: TOGGLE_THEME_TYPE
});