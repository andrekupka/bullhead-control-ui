import {LightBullThunkDispatch} from '../../../types/redux';
import {HttpActions} from './actions';
import {useEffect} from 'react';

export interface HttpResourceLoader {
    load: () => void;
    reset: () => void;
}

export type ResourceConsumer<T> = (resource: T) => void;

export const createHttpResourceLoader = <T>(dispatch: LightBullThunkDispatch,
                                            label: string,
                                            path: string,
                                            consumer: ResourceConsumer<T>) => {
    return {
        load: () => dispatch(HttpActions.request(label, {
                method: 'get',
                path: path,
                successHandler: (response) => {
                    consumer(response as T);
                }
            })),
        reset: () => dispatch(HttpActions.reset(label)),
    };
};

export const useHttpLoader = (loader: HttpResourceLoader) => {
    const {load, reset} = loader;
    useEffect(() => {
        load();
        return () => reset();
    }, [load, reset]);
};