import { createAction, ActionType } from "typesafe-actions";

export const NavigationActions = {
    show: createAction('@ui/navigation/SHOW_NAVIGATION', action => (show: boolean) => action({show}))
};

export type NavigationAction = ActionType<typeof NavigationActions>;