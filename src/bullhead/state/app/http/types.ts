import {LightBullThunkDispatch} from '../../../types/redux';

export type SuccessHandler<T> = (response: T, dispatch: LightBullThunkDispatch) => void;

export type ErrorHandler = (error: Error, dispatch: LightBullThunkDispatch) => void;

export interface RequestConfigBase {
    path: string;
}

export interface GetRequestConfig<T> extends RequestConfigBase {
    method: 'get';
    successHandler: SuccessHandler<T>;
    errorHandler?: ErrorHandler;
}

export interface PostRequestConfig<T> extends RequestConfigBase {
    method: 'post';
    body: any;
    successHandler: SuccessHandler<T>;
    errorHandler?: ErrorHandler;
}

export type RequestConfig<T> = GetRequestConfig<T> | PostRequestConfig<T>;