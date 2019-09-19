import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {delay} from '../../utils';
import {LightBullState} from '../index';
import {ShowModelActions} from '../model/shows/actions';
import {VisualModelActions} from '../model/visuals/actions';
import {LoadingActions} from './actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShows());
    dispatch(loadVisuals());
};

export const loadShows = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(LoadingActions.showsRequest());
    try {
        const shows = await Api.loadShows();
        if (isLoadingEnabled()) {
            dispatch(ShowModelActions.initialize(shows))
            dispatch(LoadingActions.showsSuccess());
        }
    } catch (error) {
        dispatch(LoadingActions.showsFailure());
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadShows());
        }
    }
};

export const loadVisuals = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(LoadingActions.visualsRequest());
    try {
        const visuals = await Api.loadVisuals();
        if (isLoadingEnabled()) {
            dispatch(VisualModelActions.initialize(visuals))
            dispatch(LoadingActions.visualsSuccess());
        }
    } catch (error) {
        dispatch(LoadingActions.visualsFailure());
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadVisuals());
        }
    }

};