import {LightBullThunkDispatch} from '../../../types/redux';

export type SuccessHandler<T> = (response: T, dispatch: LightBullThunkDispatch) => void;

export interface RequestConfigBase {
    path: string;
}

export interface GetRequestConfig<T> extends RequestConfigBase {
    method: 'get',
    successHandler: SuccessHandler<T>
}

export interface PostRequestConfig<T> extends RequestConfigBase {
    method: 'post'
    body: any,
    successHandler: SuccessHandler<T>
}

export type RequestConfig<T> = GetRequestConfig<T> | PostRequestConfig<T>;