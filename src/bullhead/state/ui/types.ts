export const SHOW_NAVIGATION = '@ui/SHOW_NAVIGATION';

export interface ShowNavigationDrawerAction {
    type: typeof SHOW_NAVIGATION,
    payload: {
        show: boolean
    }
}

export type UiActionTypes = ShowNavigationDrawerAction;