import {Show, ShowCollection} from '../../model/Show';

export const INITIALIZE_SHOWS = '@shows/INITIALIZE';
export const START_ADD_SHOW = '@shows/ADD_START';
export const END_ADD_SHOW = '@shows/ADD_END';
export const ADD_SHOW_REQUEST = '@shows/ADD_REQUEST';
export const ADD_SHOW_SUCCESS = '@shows/ADD_SUCCESS';
export const ADD_SHOW_FAILURE = '@shows/ADD_FAILURE';
export const ADD_SHOW_RESET = '@shows/ADD_RESET';

export const initializeShows = (shows: ShowCollection) => ({
    type: INITIALIZE_SHOWS as typeof INITIALIZE_SHOWS,
    payload: {
        shows: shows
    }
});

export const startAddShow = () => ({
    type: START_ADD_SHOW as typeof START_ADD_SHOW
});

export const endAddShow = () => ({
    type: END_ADD_SHOW as typeof END_ADD_SHOW
});

export const addShowRequest = () => ({
    type: ADD_SHOW_REQUEST as typeof ADD_SHOW_REQUEST
});

export const addShowSuccess = (show: Show) => ({
    type: ADD_SHOW_SUCCESS as typeof ADD_SHOW_SUCCESS,
    payload: {
        show: show
    }
});

export const addShowFailure = (error: string) => ({
    type: ADD_SHOW_FAILURE as typeof ADD_SHOW_FAILURE,
    payload: {
        error: error
    }
});

export const addShowReset = () => ({
    type: ADD_SHOW_RESET as typeof ADD_SHOW_RESET
});

export type ShowActionTypes =
    ReturnType<typeof initializeShows>
    | ReturnType<typeof startAddShow>
    | ReturnType<typeof endAddShow>
    | ReturnType<typeof addShowRequest>
    | ReturnType<typeof addShowSuccess>
    | ReturnType<typeof addShowFailure>
    | ReturnType<typeof addShowReset>;
