import {LightBullState} from '../../index';

export const selectShowsCreateModeActive = (state: LightBullState) => state.ui.shows.createModeActive;

export const selectShowsFilter = (state: LightBullState) => state.ui.shows.filter;

export const selectShowsFavoritesOnly = (state: LightBullState) => state.ui.shows.favoritesOnly;
