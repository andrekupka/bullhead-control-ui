import {LightBullState} from '../../index';
import {selectRequestIsPending} from '../../app/http/selectors';
import {deleteShowLabel, updateShowLabel} from '../../app/shows/requests';

export const selectVisualsFilter = (state: LightBullState) => state.ui.showDetails.filter;

export const selectShowIsUpdating = (state: LightBullState, showId: string) =>
    selectRequestIsPending(state, updateShowLabel(showId)) ||
    selectRequestIsPending(state, deleteShowLabel(showId));