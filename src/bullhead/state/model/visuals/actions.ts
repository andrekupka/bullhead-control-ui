import {ActionType, createAction} from 'typesafe-actions';
import {VisualCollection} from '../../../model/Visual';

export const VisualModelActions = {
    setAll: createAction('@model/visuals/SET_ALL', action => (visuals: VisualCollection) =>
        action({visuals})
    )
};

export type VisualModelAction = ActionType<typeof VisualModelActions>;