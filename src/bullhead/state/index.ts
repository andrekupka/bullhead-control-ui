import {combineReducers} from 'redux';
import {authenticationReducer} from './authentication/reducer';
import {themeReducer} from './theme/reducer';
import {navigationReducer} from './navigation/reducer';

export const lightBullReducer = combineReducers({
    authentication: authenticationReducer,
    navigation: navigationReducer,
    theme: themeReducer
});

export type LightBullState = ReturnType<typeof lightBullReducer>;