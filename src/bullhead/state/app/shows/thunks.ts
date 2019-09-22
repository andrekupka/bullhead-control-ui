import {Show} from '../../../model/Show';
import {Api} from '../../../store';
import {LightBullThunkDispatch} from '../../../types/redux';
import {ShowModelActions} from '../../model/shows/actions';
import {showErrorMessage} from '../../ui/messages/thunks';
import {ShowCreationActions} from './create/actions';
import {ShowUpdatingActions} from './updating/actions';

export const addShow = (name: string) => async (dispatch: LightBullThunkDispatch) => {
    dispatch(ShowCreationActions.request());
    try {
        const show = await Api.createShow(name);
        dispatch(ShowModelActions.set(show));
        dispatch(ShowCreationActions.success(show.id));
    } catch (error) {
        dispatch(showErrorMessage(`Failed to add show: ${error.message}`));
        dispatch(ShowCreationActions.reset());
    }
};

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