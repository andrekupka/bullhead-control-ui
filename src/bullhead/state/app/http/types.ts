import {LightBullThunkDispatch} from '../../../types/redux';

export type ResponseSuccessHandler<T> = (response: T, dispatch: LightBullThunkDispatch) => void;

export type EmptyResponseSuccessHandler = (dispatch: LightBullThunkDispatch) => void;

export type ErrorHandler = (error: Error, dispatch: LightBullThunkDispatch) => void;

export interface RequestBase {
    path: string;
    errorHandler?: ErrorHandler;
}

export interface RequestWithResponseBase<T> extends RequestBase {
    successHandler?: ResponseSuccessHandler<T>
}

export interface RequestWithEmptyResponseBase extends RequestBase {
    successHandler?: EmptyResponseSuccessHandler
}

export interface RequestWithBodyBase extends RequestBase {
    body: any;
}

export interface GetRequest<T> extends RequestWithResponseBase<T> {
    method: 'get';
}

export interface PostRequest<T> extends RequestWithResponseBase<T>, RequestWithBodyBase {
    method: 'post';
}

export interface PutRequest<T> extends RequestWithResponseBase<T>, RequestWithBodyBase {
    method: 'put'
}

export interface DeleteRequest extends RequestWithEmptyResponseBase {
    method: 'delete'
}

export type Request<T> = GetRequest<T> | PostRequest<T> | PutRequest<T> | DeleteRequest;