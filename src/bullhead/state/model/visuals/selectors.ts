import {Show} from '../../../model/Show';
import {Visual} from '../../../model/Visual';
import {LightBullState} from '../../index';
import {selectShow} from '../shows/selectors';

const visualComparator = (visual1: Visual, visual2: Visual): number => {
    return visual1.name.localeCompare(visual2.name);
};

export const selectVisualsOfShow = (state: LightBullState, showId: string) => {
    const show = selectShow(state, showId);
    if (!show) {
        return [];
    }
    return show.visualIds.map(visualId => state.model.visuals[visualId]).sort(visualComparator);
};