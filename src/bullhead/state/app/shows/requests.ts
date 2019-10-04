import {HttpActions} from '../http/actions';
import {Show, ShowWithVisuals} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {ShowsActions} from './actions';
import {showErrorMessage, showSuccessMessage} from '../../ui/messages/thunks';
import {selectShow} from '../../model/shows/selectors';
import {ModelActions} from '../../model/actions';

export const CREATE_SHOW_LABEL = 'create_show';

export const updateShowLabel = (showId: string) => `update_show_${showId}`;

export const deleteShowLabel = (showId: string) => `delete_show_${showId}`;

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
    successHandler: (response: any, dispatch) => {
        const show = response as ShowWithVisuals;
        dispatch(ShowModelActions.set({
            ...show,
            visualIds: show.visuals.map(visual => visual.id)
        }));
    },
    errorHandler: (error: Error, dispatch) => dispatch(showErrorMessage(`Failed to update show: ${error.message}`))
});

export const deleteShowReqeust = (showId: string) => HttpActions.request(deleteShowLabel(showId), {
    method: 'delete',
    path: `/api/shows/${showId}`,
    successHandler: (dispatch, getState) => {
        const show = selectShow(getState(), showId);
        dispatch(ModelActions.remove('show', showId));
        if (show) {
            dispatch(showSuccessMessage(`Show ${show.name} has been deleted`));
        }
    },
    errorHandler: (error: Error, dispatch) => dispatch(showErrorMessage(`Failed to delete show: ${error.message}`))
});