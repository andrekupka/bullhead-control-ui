import {Show} from '../../../model/Show';
import {Api} from '../../../store';
import {LightBullThunkDispatch} from '../../../types/redux';
import {ShowModelActions} from '../../model/shows/actions';
import {showErrorMessage} from '../../ui/messages/thunks';
import {ShowUpdatingActions} from './updating/actions';

export const updateShow = (show: Show) => async (dispatch: LightBullThunkDispatch) => {
    try {
        dispatch(ShowUpdatingActions.request(show.id));
        const updatedShow = await Api.updateShow(show);
        dispatch(ShowModelActions.set(updatedShow));
    } catch (error) {
        dispatch(showErrorMessage(`Failed to update show: ${error.message}`));
    } finally {
        dispatch(ShowUpdatingActions.finish(show.id));
    }
};