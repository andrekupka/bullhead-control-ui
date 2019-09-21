import {LightBullState} from '../../index';

export const selectShowFilter = (state: LightBullState) => state.ui.shows.showFilter;

export const selectShowsFavoritesOnly = (state: LightBullState) => state.ui.shows.favoritesOnly;
