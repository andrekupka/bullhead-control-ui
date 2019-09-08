import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {lightBullReducer, LightBullState} from './state';
import {webSocketMiddleware} from './state/web-socket/middleware';
import {webSocketConnect} from "./state/web-socket/actions";
import {tokenPersistingMiddleware} from "./state/authentication/middleware";
import {authenticationLoad} from "./state/authentication/actions";

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const initializeState = (store: Store<LightBullState>) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token !== null) {
        store.dispatch(authenticationLoad(token));
        store.dispatch(webSocketConnect());
    }
};

const initializeStore = () => {
    const middlewares = [
        thunk,
        tokenPersistingMiddleware(LOCAL_STORAGE_TOKEN_KEY),
        webSocketMiddleware()
    ];

    const store = createStore(
        lightBullReducer,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );

    initializeState(store);

    return store;
};


export const store = initializeStore();
