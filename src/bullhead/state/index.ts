import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';
import {authenticationReducer} from './authentication/reducer';
import {connectionReducer} from './connection/reducer';
import {loadingReducer} from './loading/reducer';
import {modelReducer} from './model/reducer';
import {uiReducer} from './ui/reducer';
import {webSocketReducer} from './web-socket/reducer';

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    connection: connectionReducer,
    webSocket: webSocketReducer,
    loading: loadingReducer,

    model: modelReducer,
    ui: uiReducer,
});

export type LightBullState = StateType<typeof lightBullReducer>;
