export const SHOW_NAVIGATION = '@navigation/SHOW_NAVIGATION';

export interface ShowNavigationAction {
    type: typeof SHOW_NAVIGATION,
    payload: {
        show: boolean
    }
}

export type NavigationActionTypes = ShowNavigationAction;