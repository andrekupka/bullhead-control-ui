import {ModelAction, ModelActions, ModelType, IdWithParent, RecursiveIdsByModel} from './actions';
import {MiddlewareAPI} from 'redux';
import {LightBullState} from '../index';
import {LightBullThunkDispatch} from '../../types/redux';
import {isActionOf} from 'typesafe-actions';
import {selectShow} from './shows/selectors';

type MDAction = ModelAction;
type MDDispatch = LightBullThunkDispatch;
type MDMiddlewareAPI = MiddlewareAPI<MDDispatch, LightBullState>;


type ModelWithIdsWithParent = [ModelType, Array<IdWithParent>];

type IdResolverResult = ModelWithIdsWithParent | undefined;

type IdResolver = (state: LightBullState, modelId: string) => IdResolverResult;

type IdResolverMap = { [K in ModelType]?: IdResolver };

export const modelDeletingMiddleware = () => {
    const resolverMap: IdResolverMap = {
        'show': (state: LightBullState, modelId: string) => {
            const show = selectShow(state, modelId);
            if (show && show.visualIds.length > 0) {
                return ['visual', show.visualIds.map(visualId => ({
                    id: visualId,
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

        const rootType = action.payload.model;
        const rootId = action.payload.modelId;
        const rootParentId = action.payload.parentId;

        const recursiveIds: RecursiveIdsByModel = {};

        let queue: Array<ModelWithIdsWithParent> = [[rootType, [{
            id: rootId
        }]]];

        while (true) {
            const data = queue.shift();
            if (!data) {
                break;
            }
            const [modelType, modelIds] = data;

            let ids = recursiveIds[modelType];
            if (ids === undefined) {
                ids = [];
                recursiveIds[modelType] = ids;
            }

            const resolver = resolverMap[modelType];
            for (let id of modelIds) {
                ids.push(id);
                if (resolver) {
                    const result = resolver(api.getState(), id.id);
                    if (result) {
                        queue.push(result);
                    }
                }
            }
        }

        return api.dispatch(ModelActions.removeRecursive(recursiveIds, rootType, rootId, rootParentId));
    };
};