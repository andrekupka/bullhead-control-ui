import {ActionType, createAction} from 'typesafe-actions';
import {VisualWithGroupIds, VisualCollection} from '../../../model/Visual';

export const VisualModelActions = {
    setAll: createAction('@model/visuals/SET_ALL', action => (visuals: VisualCollection) =>
        action({visuals})
    ),
    set: createAction('@model/visuals/SET', action => (visual: VisualWithGroupIds) =>
        action({visual})
    ),
    add: createAction('@model/visuals/ADD', action => (visual: VisualWithGroupIds) =>
        action({visual})
    )
};

export type VisualModelAction = ActionType<typeof VisualModelActions>;