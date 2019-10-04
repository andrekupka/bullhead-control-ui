import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {deleteShowLabel, updateShowLabel} from './requests';

export const selectShowHasProgress = (state: LightBullState, showId: string) =>
    selectRequestIsPending(state, updateShowLabel(showId)) ||
    selectRequestIsPending(state, deleteShowLabel(showId));