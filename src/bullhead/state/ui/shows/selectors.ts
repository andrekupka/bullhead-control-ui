import {LightBullState} from '../../index';

export const selectShowsLoadingState = (state: LightBullState) => state.ui.shows.loadingState;

export const selectShowsFilter = (state: LightBullState) => state.ui.shows.showFilter;

export const selectShowsFavoritesOnly = (state: LightBullState) => state.ui.shows.favoritesOnly;
