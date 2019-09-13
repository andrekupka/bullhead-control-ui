import {Show, ShowCollection} from '../../../model/Show';

export const INITIALIZE_SHOWS = '@model/shows/INITIALIZE';
export const PUSH_SHOW = '@model/shows/PUSH';

export const initializeShows = (shows: ShowCollection) => ({
    type: INITIALIZE_SHOWS as typeof INITIALIZE_SHOWS,
    payload: {
        shows: shows
    }
});

export const pushShow = (show: Show) => ({
    type: PUSH_SHOW as typeof PUSH_SHOW,
    payload: {
        show: show
    }
});

export type ShowsActionTypes =
    ReturnType<typeof initializeShows>
    | ReturnType<typeof pushShow>;