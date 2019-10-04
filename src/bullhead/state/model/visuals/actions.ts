import {ActionType, createAction} from 'typesafe-actions';
import {Visual, VisualCollection} from '../../../model/Visual';

export const VisualModelActions = {
    setAll: createAction('@model/visuals/SET_ALL', action => (visuals: VisualCollection) =>
        action({visuals})
    ),
    set: createAction('@model/visuals/SET', action => (visual: Visual) =>
        action({visual})
    ),
    add: createAction('@model/visuals/ADD', action => (visual: Visual) =>
        action({visual})
    )
};

export type VisualModelAction = ActionType<typeof VisualModelActions>;