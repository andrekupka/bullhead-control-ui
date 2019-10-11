import {LightBullThunkDispatch} from '../../../types/redux';
import {createParameterizedHttpResourceLoader} from '../../app/http/loader';
import {VisualModelActions} from '../../model/visuals/actions';
import {toVisualWithGroupIds, VisualWithGroups} from '../../../model/Visual';
import {GroupModelActions} from '../../model/groups/actions';
import {ParameterCollection} from '../../../model/Parameter';
import {ParameterModelActions} from '../../model/parameters/actions';
import {toGroupWithParameterIds} from '../../../model/Group';

export const getVisualLabel = (visualId: string) => `get_visual_${visualId}`;

export const createVisualLoader = (dispatch: LightBullThunkDispatch) =>
    createParameterizedHttpResourceLoader(dispatch,
        (visualId: string) => getVisualLabel(visualId),
        visualId => `/api/visuals/${visualId}`,
        (visualWithGroups: VisualWithGroups) => {
            const visual = toVisualWithGroupIds(visualWithGroups);
            const groups = visualWithGroups.groups.map(group => toGroupWithParameterIds(group));

            const parameters: ParameterCollection = [];
            visualWithGroups.groups.forEach(group =>
                group.effect.parameters.forEach(parameter =>
                    parameters.push(parameter)
                )
            );

            dispatch(VisualModelActions.set(visual));
            dispatch(GroupModelActions.setAll(groups));
            dispatch(ParameterModelActions.setAll(parameters));
        }
    );
