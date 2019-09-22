import {createSelector} from 'reselect';
import {Show} from '../../../model/Show';
import {LightBullState} from '../../index';
import {selectShowsFavoritesOnly, selectShowsFilter} from '../../ui/shows/selectors';


type ShowFilter = (show: Show) => boolean;

const getShowFilter = (filter?: string): ShowFilter => {
    if (filter) {
        return show => show.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }
    return () => true;
};

const showComparator = (show1: Show, show2: Show): number => {
    if (show1.favorite !== show2.favorite) {
        return show1.favorite ? -1 : 1;
    }
    return show1.name.localeCompare(show2.name);
};

export const selectShows = (state: LightBullState) => state.model.shows;

export const selectShow = (state: LightBullState, showId: string) => state.model.shows[showId];

export const selectShowList = createSelector(
    [selectShows],
    shows => Object.keys(shows).map(showId => shows[showId])
);

export const selectFilteredShows = createSelector(
    [selectShowList, selectShowsFilter, selectShowsFavoritesOnly],
    (shows, filter, favoritesOnly) => {
        const filteredShows = favoritesOnly ? shows.filter(show => show.favorite) : shows;
        return filteredShows.filter(getShowFilter(filter)).sort(showComparator);
    }
);