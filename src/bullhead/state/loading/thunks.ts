import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {delay} from '../../utils';
import {LightBullState} from '../index';
import {ShowModelActions} from '../model/shows/actions';
import {VisualModelActions} from '../model/visuals/actions';
import {LoadingActions} from './actions';
import {ConfigModelActions} from '../model/config/actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadConfig());
    dispatch(loadShows());
    dispatch(loadVisuals());
};

export const loadConfig = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(LoadingActions.request('config'));
    try {
        const config = await Api.loadConfig();
        if (isLoadingEnabled()) {
            dispatch(ConfigModelActions.initialize(config));
            dispatch(LoadingActions.success('config'));
        }
    } catch (error) {
        dispatch(LoadingActions.failure('config'));
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadConfig());
        }
    }
};

export const loadShows = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(LoadingActions.request('shows'));
    try {
        const shows = await Api.loadShows();
        if (isLoadingEnabled()) {
            dispatch(ShowModelActions.initialize(shows));
            dispatch(LoadingActions.success('shows'));
        }
    } catch (error) {
        dispatch(LoadingActions.failure('shows'));
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadShows());
        }
    }
};

export const loadVisuals = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(LoadingActions.request('visuals'));
    try {
        const visuals = await Api.loadVisuals();
        if (isLoadingEnabled()) {
            dispatch(VisualModelActions.initialize(visuals))
            dispatch(LoadingActions.success('visuals'));
        }
    } catch (error) {
        dispatch(LoadingActions.failure('visuals'));
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadVisuals());
        }
    }
};
