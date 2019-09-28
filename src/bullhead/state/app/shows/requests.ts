import {HttpActions} from '../http/actions';
import {Show} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {ShowsActions} from './actions';
import {showErrorMessage} from '../../ui/messages/thunks';

export const CREATE_SHOW_LABEL = 'create_show';

export const updateShowLabel = (showId: string) => `update_show_${showId}`;

export const createShowRequest = (name: string) => HttpActions.request(CREATE_SHOW_LABEL, {
    method: 'post',
    path: '/api/shows',
    body: {
        name: name
    },
    successHandler: (response: any, dispatch) => {
        const show = response as Show;
        dispatch(ShowModelActions.set(show));
        dispatch(ShowsActions.setNewShowId(show.id));
    },
    errorHandler: (error, dispatch) => {
        dispatch(showErrorMessage(`Failed to add show: ${error.message}`));
    }
});

export const updateShowRequest = (show: Show) => HttpActions.request(updateShowLabel(show.id), {
    method: 'put',
    path: `/api/shows/${show.id}`,
    body: show,
    successHandler: (response: any, dispatch) => dispatch(ShowModelActions.set(response as Show)),
    errorHandler: (error: Error, dispatch) => dispatch(showErrorMessage(`Failed to update show: ${error.message}`))
});