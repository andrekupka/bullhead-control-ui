import {ActionType, createAction} from 'typesafe-actions';
import {VisualCollection} from '../../../model/Visual';

export const VisualModelActions = {
    initialize: createAction('@model/visuals/INITIALIZE', action => (visuals: VisualCollection) =>
        action({visuals})
    )
};

export type VisualModelAction = ActionType<typeof VisualModelActions>;