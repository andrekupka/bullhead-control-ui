import {ActionType} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const ThemeActions = {
    toggle: createEmptyAction('@theme/TOGGLE_THEME')
};

export type ThemeAction = ActionType<typeof ThemeActions>;