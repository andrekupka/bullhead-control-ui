import {LightBullThunkDispatch} from '../../../types/redux';
import {createHttpResourceLoader} from '../../app/http/loader';
import {ShowWithVisuals} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {VisualModelActions} from '../../model/visuals/actions';

export const createLabel = (showId: string) => `get_show_${showId}`;

export const createShowDetailsLoader = (dispatch: LightBullThunkDispatch, showId: string) =>
    createHttpResourceLoader(dispatch, createLabel(showId), `/api/shows/${showId}`,
        (showWithVisuals: ShowWithVisuals) => {
            const show = {
                ...showWithVisuals,
                visuals: showWithVisuals.visuals.map(visual => visual.id)
            };
            dispatch(ShowModelActions.set(show));
            dispatch(VisualModelActions.setAll(showWithVisuals.visuals));
        });
