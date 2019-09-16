import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {delay} from '../../utils';
import {LightBullState} from '../index';
import {ShowModelActions} from '../model/shows/actions';
import {LoadingActions} from './actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShows());
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