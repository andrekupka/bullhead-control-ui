import {ShowCollection} from '../../model/Show';

export const INITIALIZE_SHOWS = '@shows/INITIALIZE';

export const initializeShows = (shows: ShowCollection) => ({
    type: INITIALIZE_SHOWS as typeof INITIALIZE_SHOWS,
    payload: {
        shows: shows
    }
});

export type ShowActionTypes =
    ReturnType<typeof initializeShows>;
