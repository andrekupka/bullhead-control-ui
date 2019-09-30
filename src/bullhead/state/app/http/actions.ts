import {ActionType, createAction} from 'typesafe-actions';
import {Request} from './types';
import {CancelTokenSource} from 'axios';

export const HttpActions = {
    request: createAction('@app/http/REQUEST', action => <T>(label: string, request: Request<T>) =>
        action({label, request})),
    initRequest: createAction('@app/http/INIT_REQUEST', action => <T>(label: string, cancelSource: CancelTokenSource) =>
        action({label ,cancelSource})),
    success: createAction('@app/http/SUCCESS', action => (label: string) =>
        action({label})),
    failure: createAction('@app/http/FAILURE', action => (label: string, error: Error) =>
        action({label, error})),
    reset: createAction('@app/http/RESET', action => (label: string) => action({label}))
};

export type HttpAction = ActionType<typeof HttpActions>;