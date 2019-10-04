import {HttpActions} from '../http/actions';
import {showErrorMessage, showSuccessMessage} from '../../ui/messages/thunks';
import {VisualModelActions} from '../../model/visuals/actions';
import {Visual} from '../../../model/Visual';
import {VisualCreationActions} from './creation/actions';
import {selectVisual} from '../../model/visuals/selectors';
import {ModelActions} from '../../model/actions';

export const CREATE_VISUAL_LABEL = 'create_visual';

export const updateVisualLabel = (visualId: string) => `update_visual_${visualId}`;

export const deleteVisualLabel = (visualId: string) => `delete_visual_${visualId}`;

export const createVisualRequest = (showId: string, name: string) => HttpActions.request(CREATE_VISUAL_LABEL, {
    method: 'post',
    path: '/api/visuals',
    body: {
        showId: showId,
        name: name
    },
    successHandler: (response: any, dispatch) => {
        const visual = response as Visual;
        dispatch(VisualModelActions.add(visual));
        dispatch(VisualCreationActions.setVisualId(visual.id));
    },
    errorHandler: (error, dispatch) => {
        dispatch(showErrorMessage(`Failed to add visual: ${error.message}`));
    }
});

export const updateVisualRequest = (visual: Visual) => HttpActions.request(updateVisualLabel(visual.id), {
    method: 'put',
    path: `/api/visuals/${visual.id}`,
    body: visual,
    successHandler: (response: any, dispatch) => dispatch(VisualModelActions.set(response as Visual)),
    errorHandler: (error: Error, dispatch) => dispatch(showErrorMessage(`Failed to update visual: ${error.message}`))
});

export const deleteVisualRequest = (visualId: string, showId: string) => HttpActions.request(deleteVisualLabel(visualId), {
    method: 'delete',
    path: `/api/visuals/${visualId}`,
    successHandler: (dispatch, getState) => {
        const visual = selectVisual(getState(), visualId);
        dispatch(ModelActions.remove('visual', visualId, showId));
        if (visual) {
            dispatch(showSuccessMessage(`Visual ${visual.name} has been deleted`));
        }
    }
});