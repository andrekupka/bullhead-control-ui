import {createStore} from 'redux';
import {bullheadReducer} from './state';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(
    bullheadReducer,
    composeWithDevTools()
);