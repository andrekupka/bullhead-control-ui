export const SIGN_IN_START = '@authentication/SIGN_IN_START';
export const SIGN_IN_SUCCESS = '@authentication/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = '@authentication/SIGN_IN_FAILURE';
export const SIGN_OUT = '@authentication/SIGN_OUT';

export enum AuthenticationError {
    WRONG_PASSWORD,
    TIMEOUT,
    GENERAL_FAILURE
}


export interface SignInStartAction {
    type: typeof SIGN_IN_START;
}

export interface SignInSuccessAction {
    type: typeof SIGN_IN_SUCCESS;
}

export interface SignInFailureAction {
    type: typeof SIGN_IN_FAILURE;
    payload: {
        error: AuthenticationError
    }
}

export interface SignOutAction {
    type: typeof SIGN_OUT,
}

export type AuthenticationActionTypes = SignInStartAction | SignInSuccessAction | SignInFailureAction | SignOutAction;