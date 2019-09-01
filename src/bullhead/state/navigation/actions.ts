import {NavigationActionTypes, SHOW_NAVIGATION} from './types';

export const showNavigation = (show: boolean): NavigationActionTypes => ({
    type: SHOW_NAVIGATION,
    payload: {
        show: show
    }
});