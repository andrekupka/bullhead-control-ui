import {LightBullState} from '../..';

export const selectFinishedLoading = (state: LightBullState) => state.app.initialization.config.loaded &&
    state.app.initialization.visuals.loaded &&
    state.connection.connectionId !== undefined;
