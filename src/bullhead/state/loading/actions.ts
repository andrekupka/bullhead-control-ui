export const LOAD_SHOWS_REQUEST = '@loading/SHOWS_REQUEST';
export const LOAD_SHOWS_SUCCESS = '@loading/SHOWS_SUCCESS';
export const LOAD_SHOWS_FAILURE = '@loading/SHOWS_FAILURE';

export const loadShowsRequest = () => ({
    type: LOAD_SHOWS_REQUEST as typeof LOAD_SHOWS_REQUEST
});

export const loadShowsSuccess = () => ({
    type: LOAD_SHOWS_SUCCESS as typeof LOAD_SHOWS_SUCCESS,
});

export const loadShowsFailure = () => ({
    type: LOAD_SHOWS_FAILURE as typeof LOAD_SHOWS_FAILURE,
});

export type LoadingActionTypes =
    ReturnType<typeof loadShowsRequest>
    | ReturnType<typeof loadShowsSuccess>
    | ReturnType<typeof loadShowsFailure>;
