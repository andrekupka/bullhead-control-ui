import {LightBullThunkDispatch} from '../../types/redux';
import {loadShows} from '../shows/thunks';

export const startPreLoading = () => (dispatch: LightBullThunkDispatch) => {
    dispatch(loadShows());
};

