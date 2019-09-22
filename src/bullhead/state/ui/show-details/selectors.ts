import {LightBullState} from '../../index';

export const selectShowDetailsLoadingState = (state: LightBullState) => state.ui.showDetails.loadingState;

export const selectVisualsFilter = (state: LightBullState) => state.ui.showDetails.filter;