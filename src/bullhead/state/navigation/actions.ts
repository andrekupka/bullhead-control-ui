export const SHOW_NAVIGATION = '@navigation/SHOW_NAVIGATION';

export const showNavigation = (show: boolean) => ({
    type: SHOW_NAVIGATION as typeof SHOW_NAVIGATION,
    payload: {
        show: show
    }
});

export type NavigationActionTypes = ReturnType<typeof showNavigation>;