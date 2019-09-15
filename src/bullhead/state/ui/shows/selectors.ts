import {ShowCollection} from '../../../model/Show';
import {LightBullState} from '../../index';

type ShowFilter = (name: string) => boolean;

const getShowFilter = (filter?: string): ShowFilter => {
    if (filter) {
        return name => name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }
    return () => true;
};

export const selectFilteredShows = (state: LightBullState): ShowCollection => {
    const shows = Object.keys(state.model.shows).map(showId => state.model.shows[showId]);
    const filter = getShowFilter(state.ui.shows.filter.filter);
    return shows.filter(show => filter(show.name));
};