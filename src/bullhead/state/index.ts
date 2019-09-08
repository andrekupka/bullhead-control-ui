import {combineReducers} from 'redux';
import {authenticationReducer} from './authentication/reducer';
import {navigationReducer} from './navigation/reducer';
import {themeReducer} from './theme/reducer';
import {webSocketReducer} from './web-socket/reducer';
import {showsReducer} from "./shows/reducer";

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    navigation: navigationReducer,
    shows: showsReducer,
    theme: themeReducer,
    webSocket: webSocketReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;
