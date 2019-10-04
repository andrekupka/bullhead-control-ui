import {ShowModelAction} from './shows/actions';
import {VisualModelAction} from './visuals/actions';
import {ActionType, createAction} from 'typesafe-actions';

export type ModelType = 'show' | 'visual';

export interface IdWithParent {
    id: string;
    parentId?: string;
}

export type RelatedIdsByModel = {
    [K in ModelType]?: Array<IdWithParent>
}

export const ModelActions = {
    remove: createAction('@model/REMOVE', action =>
        (model: ModelType, modelId: string, parentId?: string) =>
            action({model, modelId, parentId})
    ),
    removeRecursive: createAction('@model/REMOVE_RECURSIVE', action =>
        (relatedIds: RelatedIdsByModel, model: ModelType, modelId: string, parentId?: string) =>
            action({relatedIds, model, modelId, parentId}))
};

export type ModelAction = ShowModelAction | VisualModelAction | ActionType<typeof ModelActions>;