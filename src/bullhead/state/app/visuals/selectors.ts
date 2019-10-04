import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {updateVisualLabel} from './requests';

export const selectVisualHasProgress = (state: LightBullState, visualId: string) =>
    selectRequestIsPending(state, updateVisualLabel(visualId));