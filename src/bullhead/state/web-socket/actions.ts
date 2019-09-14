import {ActionType, createAction} from 'typesafe-actions';
import {LightBullMessage} from '../../types/types';
import {createEmptyAction} from '../action-utils';

export const WebSocketActions = {
    connect: createEmptyAction('@web-socket/CONNECT'),
    connected: createEmptyAction('@web-socket/CONNECTED'),
    send: createAction('@web-socket/SEND', action => (message: LightBullMessage) => action({message})),
    received: createAction('@web-socket/RECEIVED', action => (message: LightBullMessage) => action({message})),
    disconnect: createAction('@web-socket/DISCONNECT', action => (permanent: boolean = false) => action({permanent})),
    disconnected: createEmptyAction('@web-socket/DISCONNECTED')
};

export type WebSocketAction = ActionType<typeof WebSocketActions>;
