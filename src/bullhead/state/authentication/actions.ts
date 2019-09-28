import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';

export const AuthenticationActions = {
    load: createAction('@authentication/LOAD', action => (token: string) => action({token})),
    success: createAction('@authentication/SUCCESS', action => (token: string) => action({token})),
    failure: createAction('@authentication/FAILURE', action => (error: string) => action({error})),
    lost: createEmptyAction('@authentication/LOST'),
    clear: createEmptyAction('@authentication/CLEAR')
};

export type AuthenticationAction = ActionType<typeof AuthenticationActions>;