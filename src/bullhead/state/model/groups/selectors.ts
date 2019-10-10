import {LightBullState} from '../../index';
import {selectVisual} from '../visuals/selectors';

export const selectGroup = (state: LightBullState, groupId: string) => state.model.groups[groupId];

export const selectGroupsOfVisual = (state: LightBullState, visualId: string) => {
    const visual = selectVisual(state, visualId);
    if (!visual) {
        return [];
    }
    // TODO what happens if group does not exist, maybe filter for undefined
    return visual.groupIds.map(groupId => selectGroup(state, groupId))
};