export const SHOW_NAVIGATION_DRAWER_TYPE = 'SHOW_NAVIGATION_DRAWER';

export interface ShowNavigationDrawerAction {
    type: typeof SHOW_NAVIGATION_DRAWER_TYPE,
    payload: {
        show: boolean
    }
}

export type UiActionTypes = ShowNavigationDrawerAction;