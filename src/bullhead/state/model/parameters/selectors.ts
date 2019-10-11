import {LightBullState} from '../../index';
import {selectGroup} from '../groups/selectors';

export const selectParameter = (state: LightBullState, parameterId: string) => state.model.parameters[parameterId];

export const selectParametersOfGroup = (state: LightBullState, groupId: string) => {
    const group = selectGroup(state, groupId);
    if (!group) {
        return [];
    }
    return group.effect.parameterIds.map(parameterId => selectParameter(state, parameterId));
};