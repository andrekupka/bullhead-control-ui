import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../http/selectors';
import {deleteShowLabel, updateShowLabel} from './requests';

export const selectNewShowId = (state: LightBullState) => state.app.shows.newShowId;

export const selectShowHasProgress = (state: LightBullState, showId: string) =>
    selectRequestIsPending(state, updateShowLabel(showId)) ||
    selectRequestIsPending(state, deleteShowLabel(showId));