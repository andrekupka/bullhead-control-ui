import {LightBullState} from '../..';

export const selectFinishedLoading = (state: LightBullState) => state.app.initialization.config.loaded &&
    state.connection.connectionId !== undefined;
