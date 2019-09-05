export const SIGN_IN = '@authentication/SIGN_IN';
export const SIGN_OUT = '@authentication/SIGN_OUT';

export interface SignInAction {
    type: typeof SIGN_IN,
    payload: {
        password: string
    }
}

export interface SignOutAction {
    type: typeof SIGN_OUT,
}

export type AuthenticationActionTypes = SignInAction | SignOutAction;