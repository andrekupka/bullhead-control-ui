export const SIGN_IN_START = '@authentication/SIGN_IN_START';
export const SIGN_IN_SUCCESS = '@authentication/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = '@authentication/SIGN_IN_FAILURE';
export const SIGN_OUT_FINISH = '@authentication/SIGN_OUT_FINISH';

export enum AuthenticationError {
    WRONG_PASSWORD,
    TIMEOUT,
    UNKNOWN_ERROR
}

export const signInStart = () => ({
    type: SIGN_IN_START as typeof SIGN_IN_START
});

export const signInSuccess = (token: string) => ({
    type: SIGN_IN_SUCCESS as typeof SIGN_IN_SUCCESS,
    payload: {
        token: token
    }
});

export const signInFailure = (error: AuthenticationError) => ({
    type: SIGN_IN_FAILURE as typeof SIGN_IN_FAILURE,
    payload: {
        error: error
    }
});

export const signOutFinish = () => ({
    type: SIGN_OUT_FINISH as typeof SIGN_OUT_FINISH
});

export type AuthenticationActionTypes =
    ReturnType<typeof signInStart>
    | ReturnType<typeof signInSuccess>
    | ReturnType<typeof signInFailure>
    | ReturnType<typeof signOutFinish>;

