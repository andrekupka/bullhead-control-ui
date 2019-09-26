import {LightBullThunkDispatch} from '../../../types/redux';
import {delay} from '../../../utils';
import {LightBullState} from '../..';
import {ConfigModelActions} from '../../model/config/actions';
import {HttpActions} from '../http/actions';
import {Config} from '../../../model/Config';

export const startInitialization = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadConfig());
};

export const LOAD_CONFIG_LABEL = 'get_config';

export const loadConfig = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isInitializationEnabled = () => getState().app.initialization.enabled;

    dispatch(HttpActions.request(LOAD_CONFIG_LABEL, {
        method: 'get',
        path: '/api/config',
        successHandler: (configJson: any) => {
            const config = configJson as Config;
            if (isInitializationEnabled()) {
                dispatch(ConfigModelActions.initialize(config));
            }
        },
        errorHandler: (error: Error) => {
            delay(2000).then(() => {
                if (isInitializationEnabled()) {
                    dispatch(loadConfig());
                }
            })
        }
    }));
};
