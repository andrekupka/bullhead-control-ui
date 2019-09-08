import {Show, ShowCollection} from "../../model/Show";

export const LOAD_ALL_SHOWS_BEGIN = '@shows/LOAD_ALL_BEGIN';
export const LOAD_ALL_SHOWS_SUCCESS = '@shows/LOAD_ALL_SUCCESS';
export const LOAD_ALL_SHOWS_FAILURE = '@shows/LOAD_ALL_FAILURE';

export const loadAllShowsBegin = () => ({
    type: LOAD_ALL_SHOWS_BEGIN as typeof LOAD_ALL_SHOWS_BEGIN
});

export const loadAllShowsSuccess = (shows: ShowCollection) => ({
    type: LOAD_ALL_SHOWS_SUCCESS as typeof LOAD_ALL_SHOWS_SUCCESS,
    payload: {
        shows: shows
    }
});

export const loadAllShowsFailure = () => ({
    type: LOAD_ALL_SHOWS_FAILURE as typeof LOAD_ALL_SHOWS_FAILURE,
});

export type ShowActionTypes =
    ReturnType<typeof loadAllShowsBegin>
    | ReturnType<typeof loadAllShowsSuccess>
    | ReturnType<typeof loadAllShowsFailure>;
