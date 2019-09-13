import {combineReducers} from 'redux';
import {authenticationReducer} from './authentication/reducer';
import {loadingReducer} from './loading/reducer';
import {modelReducer} from './model/reducer';
import {navigationReducer} from './navigation/reducer';
import {showsReducer} from './shows/reducer';
import {themeReducer} from './theme/reducer';
import {webSocketReducer} from './web-socket/reducer';

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    loading: loadingReducer,
    model: modelReducer,
    navigation: navigationReducer,
    shows: showsReducer,
    theme: themeReducer,
    webSocket: webSocketReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;
