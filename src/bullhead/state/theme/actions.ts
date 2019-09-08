export const TOGGLE_THEME = '@theme/TOGGLE_THEME';

export const toggleTheme = () => ({
    type: TOGGLE_THEME as typeof TOGGLE_THEME
});

export type ThemeActionTypes = ReturnType<typeof toggleTheme>;