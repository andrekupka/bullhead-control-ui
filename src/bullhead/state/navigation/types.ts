export const SHOW_NAVIGATION = '@navigation/SHOW_NAVIGATION';

export interface ShowNavigationDrawerAction {
    type: typeof SHOW_NAVIGATION,
    payload: {
        show: boolean
    }
}

export type NavigationActionTypes = ShowNavigationDrawerAction;