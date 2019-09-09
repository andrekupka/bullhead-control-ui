import {Api} from '../../store';
import {LightBullThunkDispatch} from '../../types/redux';
import {loadShowsFailure, loadShowsRequest, loadShowsSuccess} from './actions';

export const loadShows = () => async (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShowsRequest());
    try {
        const shows = await Api.loadShows();
        dispatch(loadShowsSuccess(shows));
    } catch (error) {
        console.log(error);
        dispatch(loadShowsFailure());
        //await delay(2000);
        //await dispatch(preLoadShows());
    }
};