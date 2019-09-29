import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {VisualModelActions} from '../../model/visuals/actions';
import {Visual} from '../../../model/Visual';

export const getVisualLabel = (visualId: string) => `get_visual_${visualId}`;

export const createVisualLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (visualId: string) => getVisualLabel(visualId),
        visualId => `/api/visuals/${visualId}`,
        (visual: Visual) => dispatch(VisualModelActions.set(visual))
    );
