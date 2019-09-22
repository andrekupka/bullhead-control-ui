import {LoadingActions} from "./actions";
import {ResourceLoadingThunkCreator} from "./thunks";
import {LightBullThunkDispatch} from "../../../types/redux";
import {useEffect} from "react";

export interface ResourceLoader {
    enable: () => void;
    disable: () => void;
    load: () => void;
}

export const createResourceLoader = <T, P>(dispatch: LightBullThunkDispatch, type: string, loadingThunkCreator: ResourceLoadingThunkCreator<T, P>, params?: P): ResourceLoader => ({
    enable: () => dispatch(LoadingActions.enable(type)),
    disable: () => dispatch(LoadingActions.disable(type)),
    load: () => dispatch(loadingThunkCreator(params))
});

export const useLoader = (loader: ResourceLoader) => {
    const {enable, disable, load} = loader;

    useEffect(() => {
        enable();
        return () => disable();
    }, [enable, disable]);

    useEffect(() => {
        load();
    }, [load]);
};