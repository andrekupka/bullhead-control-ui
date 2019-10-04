import {Visual} from '../../../model/Visual';
import {LightBullState} from '../../index';
import {selectVisualsFilter} from '../../ui/show-details/selectors';
import {selectShow} from '../shows/selectors';

type VisualFilter = (visual: Visual) => boolean;

const getVisualFilter = (filter?: string): VisualFilter => {
    if (filter) {
        return visual => visual.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }
    return () => true;
};

const visualComparator = (visual1: Visual, visual2: Visual): number => {
    return visual1.name.localeCompare(visual2.name);
};

export const selectVisual = (state: LightBullState, visualId: string) => state.model.visuals[visualId];

export const selectVisualsOfShow = (state: LightBullState, showId: string) => {
    const show = selectShow(state, showId);
    if (!show) {
        return [];
    }
    // TODO what happens if visual does not exist
    return show.visualIds.map(visualId => state.model.visuals[visualId]).sort(visualComparator);
};

export const selectFilteredVisualsOfShow = (state: LightBullState, showId: string) => {
    const visuals = selectVisualsOfShow(state, showId);
    const filter = selectVisualsFilter(state);
    return visuals.filter(getVisualFilter(filter));
};
