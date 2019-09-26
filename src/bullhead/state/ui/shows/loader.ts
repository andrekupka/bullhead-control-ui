import {ShowModelActions} from '../../model/shows/actions';
import {LightBullThunkDispatch} from '../../../types/redux';
import {ShowCollection} from '../../../model/Show';
import {createHttpResourceLoader} from '../../app/http/loader';

export const SHOWS_LOADING_STATE_LABEL = 'get_shows';

export const createShowsLoader = (dispatch: LightBullThunkDispatch) =>
    createHttpResourceLoader(dispatch, SHOWS_LOADING_STATE_LABEL, '/api/shows',
        (shows: ShowCollection) => dispatch(ShowModelActions.setAll(shows)));