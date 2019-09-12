export const LOADING_ENABLE = '@loading/ENABLE';
export const LOADING_DISABLE = '@loading/DISABLE';
export const LOADING_SHOWS_REQUEST = '@loading/SHOWS_REQUEST';
export const LOADING_SHOWS_SUCCESS = '@loading/SHOWS_SUCCESS';
export const LOADING_SHOWS_FAILURE = '@loading/SHOWS_FAILURE';

export const enableLoading = () => ({
    type: LOADING_ENABLE as typeof LOADING_ENABLE
});

export const disableLoading = () => ({
    type: LOADING_DISABLE as typeof LOADING_DISABLE
});

export const loadShowsRequest = () => ({
    type: LOADING_SHOWS_REQUEST as typeof LOADING_SHOWS_REQUEST
});

export const loadShowsSuccess = () => ({
    type: LOADING_SHOWS_SUCCESS as typeof LOADING_SHOWS_SUCCESS,
});

export const loadShowsFailure = () => ({
    type: LOADING_SHOWS_FAILURE as typeof LOADING_SHOWS_FAILURE,
});

export type LoadingActionTypes =
    ReturnType<typeof enableLoading>
    | ReturnType<typeof disableLoading>
    | ReturnType<typeof loadShowsRequest>
    | ReturnType<typeof loadShowsSuccess>
    | ReturnType<typeof loadShowsFailure>;
