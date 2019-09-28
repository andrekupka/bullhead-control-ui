import {LightBullState} from '../..';
import {selectRequestHasSucceeded} from '../http/selectors';
import {INITIALIZE_CONFIG_LABEL} from './thunks';

export const selectFinishedLoading = (state: LightBullState) => selectRequestHasSucceeded(state, INITIALIZE_CONFIG_LABEL) &&
    state.connection.connectionId !== undefined;
