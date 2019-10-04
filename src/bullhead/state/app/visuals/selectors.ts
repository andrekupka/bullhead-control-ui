import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {deleteVisualLabel, updateVisualLabel} from './requests';

export const selectVisualHasProgress = (state: LightBullState, visualId: string) =>
    selectRequestIsPending(state, updateVisualLabel(visualId)) ||
    selectRequestIsPending(state, deleteVisualLabel(visualId));