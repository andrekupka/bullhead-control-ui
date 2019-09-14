import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';

export const WebSocketActions = {
    connect: createEmptyAction('@web-socket/CONNECT'),
    connected: createEmptyAction('@web-socket/CONNECTED'),
    authenticate: createEmptyAction('@web-socket/AUTHENTICATE'),
    authenticated: createAction('@web-socket/AUTHENTICATED', action => (connectionId: string) => action({connectionId})),
    disconnect: createAction('@web-socket/DISCONNECT', action => (permanent: boolean = false) => action({permanent})),
    disconnected: createEmptyAction('@web-socket/DISCONNECTED')
};

export type WebSocketAction = ActionType<typeof WebSocketActions>;
