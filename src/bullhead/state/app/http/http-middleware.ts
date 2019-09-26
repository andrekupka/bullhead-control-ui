import {isActionOf} from 'typesafe-actions';
import {MiddlewareAPI} from 'redux';
import {LightBullState} from '../../index';
import axios, {AxiosRequestConfig} from 'axios';
import {HttpAction, HttpActions} from './actions';
import {GetRequestConfig} from './types';
import {LightBullThunkDispatch} from '../../../types/redux';
import {selectHasRequest, selectIsPending} from './selectors';

type HMAction = HttpAction;
type HMDispatch = LightBullThunkDispatch;
type HMMiddlewareAPI = MiddlewareAPI<HMDispatch, LightBullState>;

export type AxiosRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;

export interface HttpMiddlewareConfig {
    baseUrl: string;
    timeout?: number;
    interceptors?: Array<AxiosRequestInterceptor>;
}

export const httpMiddleware = (config: HttpMiddlewareConfig) => {
    const client = axios.create({
        baseURL: config.baseUrl,
        timeout: config.timeout || 10000
    });

    for (let interceptor of config.interceptors || []) {
        client.interceptors.request.use(interceptor);
    }

    const performGet = async <T>(dispatch: HMDispatch, getState: () => LightBullState,
                                 label: string, request: GetRequestConfig<T>) => {
        const isActive = () => selectHasRequest(getState(), label);

        try {
            const response = await client.get(request.path);
            const responseBody = response.data as T;
            if (isActive()) {
                request.successHandler(responseBody, dispatch);
                dispatch(HttpActions.success(label));
            }
        } catch (error) {
            if (isActive()) {
                dispatch(HttpActions.failure(label, error));
            }
        }
    };

    return (api: HMMiddlewareAPI) => (next: HMDispatch) => (action: HMAction) => {
        if (!isActionOf(HttpActions.request, action)) {
            return next(action);
        }

        const {label, request} = action.payload;

        const isPending = selectIsPending(api.getState(), label);
        if (isPending) {
            return next(action);
        }

        switch (request.method) {
            case 'get':
                performGet(api.dispatch, () => api.getState(), label, request);
                break;
        }

        return next(action);
    };
};