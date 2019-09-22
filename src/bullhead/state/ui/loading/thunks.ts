import {LightBullThunkDispatch} from '../../../types/redux';
import {LightBullState} from '../..';
import {LoadingActions} from './actions';
import {LoadingState} from "./reducer";

type LoadingStateProvider = (state: LightBullState) => LoadingState;

type ResourceLoader<T, P> = (params?: P) => Promise<T>;

type ResourceConsumer<T> = (dispatch: LightBullThunkDispatch, resource: T) => void;

type LoadingThunkConfiguration<T, P> = {
    getLoadingState: LoadingStateProvider,
    loader: ResourceLoader<T, P>,
    resourceConsumer: ResourceConsumer<T>
};

export const createResourceLoadingThunkCreator = <T, P>(type: string, config: LoadingThunkConfiguration<T, P>) =>
    (params: P | undefined = undefined) => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
        const isLoadingEnabled = () => config.getLoadingState(getState()).enabled;
        if (!isLoadingEnabled()) {
            return;
        }

        dispatch(LoadingActions.request(type));
        try {
            const resource = await config.loader(params);
            if (isLoadingEnabled()) {
                config.resourceConsumer(dispatch, resource);
                dispatch(LoadingActions.success(type));
            }
        } catch (error) {
            if (isLoadingEnabled()) {
                dispatch(LoadingActions.failure(type, error));
            }
        }
    };

export type ResourceLoadingThunkCreator<T, P> = (params: P | undefined) =>
    (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => void;