import {LightBullThunkDispatch} from '../../../types/redux';
import {Api} from '../../../store';
import {showErrorMessage} from '../../ui/messages/thunks';
import {VisualCreationActions} from './creation/actions';
import {VisualModelActions} from '../../model/visuals/actions';
import {LightBullState} from '../../index';
import {ShowModelActions} from '../../model/shows/actions';

export const createVisual = (showId: string, name: string) => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
    dispatch(VisualCreationActions.request());
    try {
        const visual = await Api.createVisual(showId, name);
        dispatch(VisualModelActions.set(visual));
        dispatch(ShowModelActions.addVisual(showId, visual.id));
        dispatch(VisualCreationActions.success(visual.id));
    } catch (error) {
        dispatch(showErrorMessage(`Failed to add visual: ${error.message}`));
        dispatch(VisualCreationActions.reset());
    }
};