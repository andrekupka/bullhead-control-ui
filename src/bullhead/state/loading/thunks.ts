import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {delay} from '../../utils';
import {LightBullState} from '../index';
import {initializeShows} from '../model/shows/actions';
import {loadShowsFailure, loadShowsRequest, loadShowsSuccess} from './actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShows());
};

export const loadShows = () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    const isLoadingEnabled = () => getState().loading.enabled;

    dispatch(loadShowsRequest());
    try {
        const shows = await Api.loadShows();
        if (isLoadingEnabled()) {
            dispatch(initializeShows(shows))
            dispatch(loadShowsSuccess());
        }
    } catch (error) {
        dispatch(loadShowsFailure());
        await delay(2000);
        if (isLoadingEnabled()) {
            dispatch(loadShows());
        }
    }
};