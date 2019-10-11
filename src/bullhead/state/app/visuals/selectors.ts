import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {deleteVisualLabel, updateVisualLabel} from './requests';

export const selectNewVisualId = (state: LightBullState) => state.app.visuals.newVisualId;

export const selectVisualHasProgress = (state: LightBullState, visualId: string) =>
    selectRequestIsPending(state, updateVisualLabel(visualId)) ||
    selectRequestIsPending(state, deleteVisualLabel(visualId));