import {ThemeAction, ThemeActions} from './actions';
import { createReducer } from 'typesafe-actions';

interface ThemeState {
    isDark: boolean;
}

const INITIAL_STATE: ThemeState = {
    isDark: true
};

export const themeReducer = createReducer<ThemeState, ThemeAction>(INITIAL_STATE)
    .handleAction(ThemeActions.toggle, state => ({
        ...state,
        isDark: !state.isDark
    }));