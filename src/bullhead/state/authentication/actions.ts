export const AUTHENTICATION_START = '@authentication/START';
export const AUTHENTICATION_SUCCESS = '@authentication/SUCCESS';
export const AUTHENTICATION_FAILURE = '@authentication/FAILURE';
export const AUTHENTICATION_LOST = '@authentication/LOST';
export const AUTHENTICATION_CLEAR = '@authentication/CLEAR';

export enum AuthenticationError {
    WRONG_PASSWORD,
    TIMEOUT,
    UNKNOWN_ERROR
}

export const authenticationStart = () => ({
    type: AUTHENTICATION_START as typeof AUTHENTICATION_START
});

export const authenticationSuccess = (token: string) => ({
    type: AUTHENTICATION_SUCCESS as typeof AUTHENTICATION_SUCCESS,
    payload: {
        token: token
    }
});

export const authenticationFailure = (error: AuthenticationError) => ({
    type: AUTHENTICATION_FAILURE as typeof AUTHENTICATION_FAILURE,
    payload: {
        error: error
    }
});

export const authenticationLost = () => ({
    type: AUTHENTICATION_LOST as typeof AUTHENTICATION_LOST
});

export const authenticationClear = () => ({
    type: AUTHENTICATION_CLEAR as typeof AUTHENTICATION_CLEAR
});

export type AuthenticationActionTypes =
    ReturnType<typeof authenticationStart>
    | ReturnType<typeof authenticationSuccess>
    | ReturnType<typeof authenticationFailure>
    | ReturnType<typeof authenticationLost>
    | ReturnType<typeof authenticationClear>;

