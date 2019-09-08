import {ThemeActionTypes, TOGGLE_THEME} from './actions';

interface ThemeState {
    isDark: boolean;
}

const INITIAL_STATE: ThemeState = {
    isDark: true
};

export const themeReducer = (state: ThemeState = INITIAL_STATE, action: ThemeActionTypes): ThemeState => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                isDark: !state.isDark
            };
        default:
            return state;
    }
};