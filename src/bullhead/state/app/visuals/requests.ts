import {HttpActions} from '../http/actions';
import {ShowModelActions} from '../../model/shows/actions';
import {showErrorMessage} from '../../ui/messages/thunks';
import {VisualModelActions} from '../../model/visuals/actions';
import {Visual} from '../../../model/Visual';
import {VisualCreationActions} from './creation/actions';

export const CREATE_VISUAL_LABEL = 'create_visual';

export const createVisualRequest = (showId: string, name: string) => HttpActions.request(CREATE_VISUAL_LABEL, {
    method: 'post',
    path: '/api/visuals',
    body: {
        show: showId,
        name: name
    },
    successHandler: (response: any, dispatch) => {
        const visual = response as Visual;
        dispatch(VisualModelActions.set(visual));
        dispatch(ShowModelActions.addVisual(showId, visual.id));
        dispatch(VisualCreationActions.setVisualId(visual.id));
    },
    errorHandler: (error, dispatch) => {
        dispatch(showErrorMessage(`Failed to add visual: ${error.message}`));
    }
});