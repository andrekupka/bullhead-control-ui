import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {Show, ShowWithVisuals} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {VisualModelActions} from '../../model/visuals/actions';

export const getShowLabel = (showId: string) => `get_show_${showId}`;

export const createShowLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (showId: string) => getShowLabel(showId),
        showId => `/api/shows/${showId}`,
        (response: any) => {
            const showWithVisuals = response as ShowWithVisuals;
            const show: Show = {
                id: showWithVisuals.id,
                name: showWithVisuals.name,
                favorite: showWithVisuals.favorite,
                visualIds: showWithVisuals.visuals.map(visual => visual.id)
            };
            dispatch(ShowModelActions.set(show));
            dispatch(VisualModelActions.setAll(showWithVisuals.visuals));
        });
