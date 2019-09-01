import {UiActionTypes, SHOW_NAVIGATION_DRAWER_TYPE} from './types';

export const showNavigationDrawer = (show: boolean): UiActionTypes => ({
    type: SHOW_NAVIGATION_DRAWER_TYPE,
    payload: {
        show: show
    }
});