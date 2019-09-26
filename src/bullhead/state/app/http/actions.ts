import {ActionType, createAction} from 'typesafe-actions';
import {Request} from './types';

export const HttpActions = {
    request: createAction('@app/http/REQUEST', action => <T>(label: string, request: Request<T>) =>
        action({label, request})),
    success: createAction('@app/http/SUCCESS', action => (label: string) =>
        action({label})),
    failure: createAction('@app/http/FAILURE', action => (label: string, error: Error) =>
        action({label, error})),
    reset: createAction('@app/http/RESET', action => (label: string) => action({label}))
};

export type HttpAction = ActionType<typeof HttpActions>;