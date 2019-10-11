import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {deleteGroupLabel} from './requests';

export const selectNewGroupId = (state: LightBullState) => state.app.groups.newGroupId;

export const selectGroupHasProgress = (state: LightBullState, groupId: string) =>
    selectRequestIsPending(state, deleteGroupLabel(groupId));