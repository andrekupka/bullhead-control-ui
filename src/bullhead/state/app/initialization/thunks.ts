import {Api} from '../../../store';
import {LightBullThunkDispatch} from '../../../types/redux';
import {delay} from '../../../utils';
import {LightBullState} from '../..';
import {VisualModelActions} from '../../model/visuals/actions';
import {InitializationActions} from './actions';
import {ConfigModelActions} from '../../model/config/actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadConfig());
    dispatch(loadVisuals());
};

export const loadConfig = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().app.initialization.enabled;

    dispatch(InitializationActions.request('config'));
    try {
        const config = await Api.loadConfig();
        if (isLoadingEnabled()) {
            dispatch(ConfigModelActions.initialize(config));
            dispatch(InitializationActions.success('config'));
        }
    } catch (error) {
        dispatch(InitializationActions.failure('config'));
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadConfig());
        }
    }
};

export const loadVisuals = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().app.initialization.enabled;

    dispatch(InitializationActions.request('visuals'));
    try {
        const visuals = await Api.loadVisuals();
        if (isLoadingEnabled()) {
            dispatch(VisualModelActions.initialize(visuals));
            dispatch(InitializationActions.success('visuals'));
        }
    } catch (error) {
        dispatch(InitializationActions.failure('visuals'));
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadVisuals());
        }
    }
};
