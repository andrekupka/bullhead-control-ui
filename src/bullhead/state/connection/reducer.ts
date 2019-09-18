import {asResetAwareReducer, ResetAware} from '../reset/reset-aware-utils';
import {ConnectionAction, ConnectionActions} from './actions';
import { createReducer } from 'typesafe-actions';

export interface ConnectionState {
    isIdentifying: boolean;
    connectionId?: string;
}

export const INITIAL_STATE: ConnectionState = {
    isIdentifying: false,
};

const pureConnectionReducer = createReducer<ConnectionState, ResetAware<ConnectionAction>>(INITIAL_STATE)
    .handleAction(ConnectionActions.identify, () => ({
        isIdentifying: true
    }))
    .handleAction(ConnectionActions.identified, (state, action) => ({
        isIdentifying: false,
        connectionId: action.payload.connectionId
    }))
    .handleAction(ConnectionActions.destroy, () => ({
        isIdentifying: false
    }));

export const connectionReducer = asResetAwareReducer(pureConnectionReducer);