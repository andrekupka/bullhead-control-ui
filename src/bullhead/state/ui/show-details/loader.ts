import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {ShowWithVisualIds, ShowWithVisuals, toShowWithVisualIds} from '../../../model/Show';
import {ShowModelActions} from '../../model/shows/actions';
import {VisualModelActions} from '../../model/visuals/actions';

export const getShowLabel = (showId: string) => `get_show_${showId}`;

export const createShowLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (showId: string) => getShowLabel(showId),
        showId => `/api/shows/${showId}`,
        (response: any) => {
            const showWithVisuals = response as ShowWithVisuals;
            const show: ShowWithVisualIds = toShowWithVisualIds(showWithVisuals)
            dispatch(ShowModelActions.set(show));

            const visuals = showWithVisuals.visuals.map(visual => ({
                id: visual.id,
                showId: visual.showId,
                name: visual.name,
                groupIds: []
            }));
            dispatch(VisualModelActions.setAll(visuals));
        });
