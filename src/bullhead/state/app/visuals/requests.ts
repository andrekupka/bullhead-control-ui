import {HttpActions} from '../http/actions';
import {showErrorMessage, showSuccessMessage} from '../../ui/messages/thunks';
import {VisualModelActions} from '../../model/visuals/actions';
import {toVisualWithGroupIds, VisualWithGroupIds, VisualWithGroups} from '../../../model/Visual';
import {VisualActions} from './actions';
import {selectVisual} from '../../model/visuals/selectors';
import {ModelActions} from '../../model/actions';

export const CREATE_VISUAL_LABEL = 'create_visual';

export const updateVisualLabel = (visualId: string) => `update_visual_${visualId}`;

export const deleteVisualLabel = (visualId: string) => `delete_visual_${visualId}`;

export const createVisualRequest = (showId: string, name: string) =>
    HttpActions.request(CREATE_VISUAL_LABEL, {
        method: 'post',
        path: '/api/visuals',
        body: {
            showId: showId,
            name: name
        },
        successHandler: (response: any, dispatch) => {
            const visual = toVisualWithGroupIds(response as VisualWithGroups);
            dispatch(VisualModelActions.add(visual));
            dispatch(VisualActions.setNewVisualId(visual.id));
        },
        errorHandler: (error, dispatch) => {
            dispatch(showErrorMessage(`Failed to add visual: ${error.message}`));
        }
    });

export const updateVisualRequest = (visual: VisualWithGroupIds) =>
    HttpActions.request(updateVisualLabel(visual.id), {
        method: 'put',
        path: `/api/visuals/${visual.id}`,
        body: visual,
        successHandler: (response: any, dispatch) =>
            dispatch(VisualModelActions.set(toVisualWithGroupIds(response as VisualWithGroups))),
        errorHandler: (error: Error, dispatch) => dispatch(showErrorMessage(`Failed to update visual: ${error.message}`))
    });

export const deleteVisualRequest = (visualId: string) =>
    HttpActions.request(deleteVisualLabel(visualId), {
        method: 'delete',
        path: `/api/visuals/${visualId}`,
        successHandler: (dispatch, getState) => {
            const visual = selectVisual(getState(), visualId);
            if (visual) {
                dispatch(ModelActions.remove('visual', visualId, visual.showId));
                dispatch(showSuccessMessage(`Visual ${visual.name} has been deleted`));
            }
        }
    });