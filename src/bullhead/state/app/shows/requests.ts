import {HttpActions} from '../http/actions';
import {Show} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {ShowCreationActions} from './creation/actions';
import {showErrorMessage} from '../../ui/messages/thunks';

export const CREATE_SHOW_LABEL = 'create_show';

export const createShowRequest = (name: string) => HttpActions.request(CREATE_SHOW_LABEL, {
    method: 'post',
    path: '/api/shows',
    body: {
        name: name
    },
    successHandler: (response: any, dispatch) => {
        const show = response as Show;
        dispatch(ShowModelActions.set(show));
        dispatch(ShowCreationActions.setShowId(show.id));
    },
    errorHandler: (error, dispatch) => {
        dispatch(showErrorMessage(`Failed to add show: ${error.message}`));
    }
});