import {LightBullThunkDispatch} from '../../../types/redux';
import {HttpActions} from './actions';
import {useEffect} from 'react';

export interface HttpResourceLoader {
    load: () => void;
    reset: () => void;
}

export type ResourceConsumer<T> = (resource: T) => void;

export const createHttpResourceLoader = <T, P>(dispatch: LightBullThunkDispatch,
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
        reset: () => dispatch(HttpActions.reset(label))
    };
};

export const useHttpLoader = (loader: HttpResourceLoader) => {
    const {load, reset} = loader;
    useEffect(() => {
        load();
        return () => reset();
    }, [load, reset]);
};


type StringSupplier<P> = (params: P) => string

const getStringSupplier = <P>(maybeSupplier: StringSupplier<P> | string): StringSupplier<P> => {
    if (typeof maybeSupplier === 'string') {
        return () => maybeSupplier;
    }
    return maybeSupplier;
};

export interface ParameterizedHttpResourceLoader<P> {
    load: (params: P) => void;
    reset: (params: P) => void;
}

export const createParameterizedHttpResourceLoader = <T, P>(dispatch: LightBullThunkDispatch,
                                                            labelSupplier: StringSupplier<P> | string,
                                                            pathSupplier: StringSupplier<P> | string,
                                                            consumer: ResourceConsumer<T>) => {
    const label = getStringSupplier(labelSupplier);
    const path = getStringSupplier(pathSupplier);

    return {
        load: (params: P) => dispatch(HttpActions.request(label(params), {
            method: 'get',
            path: path(params),
            successHandler: (response) => {
                consumer(response as T);
            }
        })),
        reset: (params: P) => dispatch(HttpActions.reset(label(params)))
    };
};

export const useParameterizedHttpLoader = <P>(loader: ParameterizedHttpResourceLoader<P>, params: P) => {
    const {load, reset} = loader;
    useEffect(() => {
        load(params);
        return () => reset(params);
    }, [load, reset, params]);
};
