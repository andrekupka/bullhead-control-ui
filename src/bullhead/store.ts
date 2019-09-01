import {createStore} from 'redux';
import {lightBullReducer} from './state';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(
    lightBullReducer,
    composeWithDevTools()
);