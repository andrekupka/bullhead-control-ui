import {combineReducers} from 'redux';
import {StateType} from 'typesafe-actions';
import {appReducer} from './app/reducer';
import {authenticationReducer} from './authentication/reducer';
import {connectionReducer} from './connection/reducer';
import {modelReducer} from './model/reducer';
import {uiReducer} from './ui/reducer';
import {webSocketReducer} from './web-socket/reducer';

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    connection: connectionReducer,
    webSocket: webSocketReducer,

    app: appReducer,
    model: modelReducer,
    ui: uiReducer,
});

export type LightBullState = StateType<typeof lightBullReducer>;
