import {combineReducers} from 'redux';
import {authenticationReducer} from './authentication/reducer';
import {loadingReducer} from './loading/reducer';
import {modelReducer} from './model/reducer';
import {themeReducer} from './theme/reducer';
import {navigationReducer} from './ui/navigation/reducer';
import {uiReducer} from './ui/reducer';
import {webSocketReducer} from './web-socket/reducer';

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    webSocket: webSocketReducer,
    loading: loadingReducer,

    navigation: navigationReducer,
    theme: themeReducer,

    model: modelReducer,
    ui: uiReducer,
});

export type LightBullState = ReturnType<typeof lightBullReducer>;
