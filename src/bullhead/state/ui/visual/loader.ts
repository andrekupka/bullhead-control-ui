import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {VisualModelActions} from '../../model/visuals/actions';
import {VisualWithGroups} from '../../../model/Visual';
import {GroupModelActions} from '../../model/groups/actions';

export const getVisualLabel = (visualId: string) => `get_visual_${visualId}`;

export const createVisualLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (visualId: string) => getVisualLabel(visualId),
        visualId => `/api/visuals/${visualId}`,
        (visualWithGroups: VisualWithGroups) => {
            const visual = {
                id: visualWithGroups.id,
                showId: visualWithGroups.showId,
                name: visualWithGroups.name,
                groupIds: visualWithGroups.groups.map(group => group.id)
            };
            dispatch(VisualModelActions.set(visual));
            dispatch(GroupModelActions.setAll(visualWithGroups.groups));
        }
    );
