import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {ShowWithVisuals} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {VisualModelActions} from '../../model/visuals/actions';

export const createLabel = (showId: string) => `get_show_${showId}`;

export const createShowDetailsLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (showId: string) => createLabel(showId),
        showId => `/api/shows/${showId}`,
        (showWithVisuals: ShowWithVisuals) => {
            const show = {
                ...showWithVisuals,
                visuals: showWithVisuals.visuals.map(visual => visual.id)
            };
            dispatch(ShowModelActions.set(show));
            dispatch(VisualModelActions.setAll(showWithVisuals.visuals));
        });
