import {VisualWithGroupIds} from '../../../model/Visual';
import {LightBullState} from '../../index';
import {selectVisualsFilter} from '../../ui/show-details/selectors';
import {selectShow} from '../shows/selectors';

type VisualFilter = (visual: VisualWithGroupIds) => boolean;

const getVisualFilter = (filter?: string): VisualFilter => {
    if (filter) {
        return visual => visual.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }
    return () => true;
};

const visualComparator = (visual1: VisualWithGroupIds, visual2: VisualWithGroupIds): number => {
    return visual1.name.localeCompare(visual2.name);
};

export const selectVisual = (state: LightBullState, visualId: string) => state.model.visuals[visualId];

export const selectVisualsOfShow = (state: LightBullState, showId: string) => {
    const show = selectShow(state, showId);
    if (!show) {
        return [];
    }
    // TODO what happens if visual does not exist
    return show.visualIds.map(visualId => selectVisual(state, visualId)).sort(visualComparator);
};

export const selectFilteredVisualsOfShow = (state: LightBullState, showId: string) => {
    const visuals = selectVisualsOfShow(state, showId);
    const filter = selectVisualsFilter(state);
    return visuals.filter(getVisualFilter(filter));
};
