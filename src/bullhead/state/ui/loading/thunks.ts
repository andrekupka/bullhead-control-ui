import {LightBullThunkDispatch} from '../../../types/redux';
import {LightBullState} from '../..';
import {LoadingActions} from './actions';
import {Action} from "typesafe-actions";
import {LoadingState} from "./reducer";


type LoadingStateProvider = (state: LightBullState) => LoadingState;

type ResourceLoader<T> = () => Promise<T>;

type ResourceConsumer<T> = (dispatch: LightBullThunkDispatch, resource: T) => Action;

type LoadingThunkConfiguration<T> = {
    getLoadingState: LoadingStateProvider,
    loader: ResourceLoader<T>,
    resourceConsumer: ResourceConsumer<T>
};

export const createResourceLoadingThunkCreator = <T>(type: string, config: LoadingThunkConfiguration<T>) =>
    () => async (dispatch: LightBullThunkDispatch, getState: () => LightBullState) => {
        const isLoadingEnabled = () => config.getLoadingState(getState()).enabled;
        if (!isLoadingEnabled()) {
            return;
        }

        dispatch(LoadingActions.request(type));
        try {
            const resource = await config.loader();
            if (isLoadingEnabled()) {
                config.resourceConsumer(dispatch, resource);
                dispatch(LoadingActions.success(type));
            }
        } catch (error) {
            if (isLoadingEnabled()) {
                dispatch(LoadingActions.failure(type));
            }
        }
    };