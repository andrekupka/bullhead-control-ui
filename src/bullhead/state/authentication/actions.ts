export const SIGN_IN_START = '@authentication/SIGN_IN_START';
export const TOKEN_ACQUIRED = '@authentication/TOKEN_ACQUIRED';
export const SIGN_IN_SUCCESS = '@authentication/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = '@authentication/SIGN_IN_FAILURE';
export const SIGN_OUT = '@authentication/SIGN_OUT';

export enum AuthenticationError {
    WRONG_PASSWORD,
    TIMEOUT,
    UNKNOWN_ERROR
}

export const signInStart = () => ({
    type: SIGN_IN_START as typeof SIGN_IN_START
});

export const tokenAcquired = (token: string) => ({
    type: TOKEN_ACQUIRED as typeof TOKEN_ACQUIRED,
    payload: {
        token: token
    }
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS as typeof SIGN_IN_SUCCESS
});

export const signInFailure = (error: AuthenticationError) => ({
    type: SIGN_IN_FAILURE as typeof SIGN_IN_FAILURE,
    payload: {
        error: error
    }
});

export const signOut = () => ({
    type: SIGN_OUT as typeof SIGN_OUT
});

export type AuthenticationActionTypes =
    ReturnType<typeof signInStart>
    | ReturnType<typeof tokenAcquired>
    | ReturnType<typeof signInSuccess>
    | ReturnType<typeof signInFailure>
    | ReturnType<typeof signOut>;

