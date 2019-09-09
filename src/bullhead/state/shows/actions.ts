import {ShowCollection} from '../../model/Show';

export const LOAD_SHOWS_REQUEST = '@shows/LOAD_REQUEST';
export const LOAD_SHOWS_SUCCESS = '@shows/LOAD_SUCCESS';
export const LOAD_SHOWS_FAILURE = '@shows/LOAD_FAILURE';

export const loadShowsRequest = () => ({
    type: LOAD_SHOWS_REQUEST as typeof LOAD_SHOWS_REQUEST
});

export const loadShowsSuccess = (shows: ShowCollection) => ({
    type: LOAD_SHOWS_SUCCESS as typeof LOAD_SHOWS_SUCCESS,
    payload: {
        shows: shows
    }
});

export const loadShowsFailure = () => ({
    type: LOAD_SHOWS_FAILURE as typeof LOAD_SHOWS_FAILURE,
});

export type ShowActionTypes =
    ReturnType<typeof loadShowsRequest>
    | ReturnType<typeof loadShowsSuccess>
    | ReturnType<typeof loadShowsFailure>;
