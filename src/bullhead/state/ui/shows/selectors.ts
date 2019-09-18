import {LightBullState} from '../../index';

export const selectShowsFilter = (state: LightBullState) => state.ui.shows.filter;

export const selectShowsFavoritesOnly = (state: LightBullState) => state.ui.shows.favoritesOnly;
