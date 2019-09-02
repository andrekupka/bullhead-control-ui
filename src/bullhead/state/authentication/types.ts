export const SET_AUTHENTICATED = '@authentication/SET_AUTHENTICATED';

export interface SetAuthenticatedAction {
    type: typeof SET_AUTHENTICATED,
    payload: {
        isAuthenticated: boolean
    }
}

export type AuthenticationActionTypes = SetAuthenticatedAction;