import {LightBullState} from '../index';

export const selectFinishedLoading = (state: LightBullState) => state.loading.shows.loaded &&
    state.loading.visuals.loaded &&
    state.connection.connectionId !== undefined;