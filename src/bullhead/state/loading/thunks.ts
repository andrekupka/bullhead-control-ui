import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {delay} from '../../utils';
import {initializeShows} from '../shows/actions';
import {loadShowsFailure, loadShowsRequest, loadShowsSuccess} from './actions';

export const startLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShows());
};

export const loadShows = () => async (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShowsRequest());
    try {
        const shows = await Api.loadShows();
        dispatch(loadShowsSuccess());
        dispatch(initializeShows(shows))
    } catch (error) {
        dispatch(loadShowsFailure());
        // TODO show failure in ui and show retry message
        await delay(1000);
        dispatch(loadShows());
    }
};