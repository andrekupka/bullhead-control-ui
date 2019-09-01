import {UiActionTypes, SHOW_NAVIGATION} from './types';

export const showNavigation = (show: boolean): UiActionTypes => ({
    type: SHOW_NAVIGATION,
    payload: {
        show: show
    }
});