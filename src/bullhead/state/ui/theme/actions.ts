import {ActionType} from 'typesafe-actions';
import {createEmptyAction} from '../../utils';

export const ThemeActions = {
    toggle: createEmptyAction('@theme/TOGGLE_THEME')
};

export type ThemeAction = ActionType<typeof ThemeActions>;