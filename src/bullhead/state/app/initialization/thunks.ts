import {LightBullThunkDispatch} from '../../../types/redux';
import {delay} from '../../../utils';
import {LightBullState} from '../..';
import {ConfigModelActions} from '../../model/config/actions';
import {HttpActions} from '../http/actions';
import {Config} from '../../../model/Config';

export const startInitialization = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(initializeConfig());
};

export const INITIALIZE_CONFIG_LABEL = 'get_config';

export const initializeConfig = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isInitializationEnabled = () => getState().app.initialization.enabled;

    if (!isInitializationEnabled()) {
        return;
    }

    dispatch(HttpActions.request(INITIALIZE_CONFIG_LABEL, {
        method: 'get',
        path: '/api/config',
        successHandler: (config: any) => {
            if (isInitializationEnabled()) {
                dispatch(ConfigModelActions.initialize(config as Config));
            }
        },
        errorHandler: (error: Error) => {
            delay(2000).then(() => {
                if (isInitializationEnabled()) {
                    dispatch(initializeConfig());
                }
            })
        }
    }));
};
