import {ModelAction, ModelActions, ModelType, IdWithParent, RelatedIdsByModel} from './actions';
import {MiddlewareAPI} from 'redux';
import {LightBullState} from '../index';
import {LightBullThunkDispatch} from '../../types/redux';
import {isActionOf} from 'typesafe-actions';
import {selectShow} from './shows/selectors';
import {selectVisual} from './visuals/selectors';

type MDAction = ModelAction;
type MDDispatch = LightBullThunkDispatch;
type MDMiddlewareAPI = MiddlewareAPI<MDDispatch, LightBullState>;


/**
 * A tuple that contains a model type (e. g. show or visual) and a list of ids of this model and optional parent ids.
 */
type ModelWithIdsWithParent = [ModelType, Array<IdWithParent>];

type OptionalModelWithIdsWithParent = ModelWithIdsWithParent | undefined;

/**
 * Resolves related child ids of the model with the given id from the given state. If the model for the given id
 * contains children, the child model type and all related child ids are returned. Further the given model id
 * will be returned as parent id of the resolved child ids.
 */
type RelatedIdResolver = (state: LightBullState, modelId: string) => OptionalModelWithIdsWithParent;

/** A mapping of model types (e. g. show or visual) to RelatedIdResolvers for the given type. */
type RelatedIdResolverMap = { [K in ModelType]?: RelatedIdResolver };

/**
 * A middleware that intercepts remove actions, computes all related model ids recursively and dispatches an action
 * to delete all computed ids.
 * The recursive child ids are resolved using a breadth-first search approach.
 */
export const modelDeletingMiddleware = () => {

    const resolverMap: RelatedIdResolverMap = {
        /** Resolves ids of child visuals. */
        show: (state: LightBullState, modelId: string) => {
            const show = selectShow(state, modelId);
            if (show && show.visualIds.length > 0) {
                return ['visual', show.visualIds.map(visualId => ({
                    id: visualId,
                    parentId: modelId
                }))];
            }
            return undefined;
        },
        visual: (state: LightBullState, modelId: string) => {
            const visual = selectVisual(state, modelId);
            if (visual && visual.groupIds.length > 0) {
                return ['group', visual.groupIds.map(groupId => ({
                    id: groupId,
                    parentId: modelId
                }))];
            }
            return undefined;
        }
    };

    return (api: MDMiddlewareAPI) => (next: MDDispatch) => (action: MDAction) => {
        if (!isActionOf(ModelActions.remove, action)) {
            return next(action);
        }

        // we extract the model type, id and parent id of the model object that is to be deleted
        const rootType = action.payload.model;
        const rootId = action.payload.modelId;
        const rootParentId = action.payload.parentId;

        // an aggregation of all recursive child ids and their parent ids by model type
        const resolvedIds: RelatedIdsByModel = {};

        // Queue of model ids that have unresolved children. Newly resolved child ids are appended to this queue.
        // We start from the root model.
        let queue: Array<ModelWithIdsWithParent> = [[rootType, [{
            id: rootId
        }]]];

        // as long as the queue still has model ids with unresolved children, we continue the breadth-first search
        while (queue.length > 0) {
            // we explicitly cast as typescript otherwise thinks that the shift call can return undefined although
            // we have checked that the queue is not empty
            const data = queue.shift() as ModelWithIdsWithParent;
            const [modelType, modelIds] = data;

            // we load the related child ids for the model type of the current queue element and initialize it if
            // necessary
            let childIds = resolvedIds[modelType];
            if (childIds === undefined) {
                childIds = [];
                resolvedIds[modelType] = childIds;
            }

            const resolver = resolverMap[modelType];
            for (let id of modelIds) {
                // push each child id to the related ids map
                childIds.push(id);

                //  we resolve child ids for the current element and add them to the queue
                if (resolver) {
                    const result = resolver(api.getState(), id.id);
                    if (result) {
                        queue.push(result);
                    }
                }
            }
        }

        // After we have resolved all related child ids we dispatch an action that contains the related child id
        // by type mapping and the root model id and type (with an optional parent).
        // The root model with its parent id is used to delete potential references from its parent (e. g. if the
        // root model is a visual then it will be deleted from the show with the given parent id).
        // The related ids are used to drop the root model and all related children from the store.
        return api.dispatch(ModelActions.removeRecursive(resolvedIds, rootType, rootId, rootParentId));
    };
};