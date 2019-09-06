import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {lightBullReducer} from './state';
import {webSocketMiddleware} from './state/web-socket/middleware';

export const store = createStore(
    lightBullReducer,
    composeWithDevTools(applyMiddleware(thunk, webSocketMiddleware()))
);