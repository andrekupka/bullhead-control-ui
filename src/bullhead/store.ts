import {createStore, applyMiddleware} from 'redux';
import {lightBullReducer} from './state';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(
    lightBullReducer,
    composeWithDevTools(applyMiddleware(thunk))
);