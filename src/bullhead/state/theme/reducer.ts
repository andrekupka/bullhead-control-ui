import {ThemeActionTypes, TOGGLE_THEME_TYPE} from './actions';

interface ThemeState {
    isDark: boolean;
}

const INITIAL_STATE: ThemeState = {
    isDark: true
};

export const reducer = (state: ThemeState = INITIAL_STATE, action: ThemeActionTypes): ThemeState => {
    switch (action.type) {
        case TOGGLE_THEME_TYPE:
            return {
                ...state,
                isDark: !state.isDark
            };
        default:
            return state;
    }
};