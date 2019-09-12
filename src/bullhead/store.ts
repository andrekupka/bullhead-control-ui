import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BASE_URL, createApi, DEFAULT_TIMEOUT} from './api/client';
import {lightBullReducer, LightBullState} from './state';
import {authenticationLoad} from './state/authentication/actions';
import {tokenPersistingMiddleware} from './state/authentication/middleware';
import {loadingMiddleware} from './state/loading/middleware';
import {webSocketConnect} from './state/web-socket/actions';
import {webSocketMiddleware} from './state/web-socket/middleware';

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
        loadingMiddleware(),
        tokenPersistingMiddleware(LOCAL_STORAGE_TOKEN_KEY),
        webSocketMiddleware()
    ];

    const store = createStore(
        lightBullReducer,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );


    return store;
};


export const store = initializeStore();

export const Api = createApi(BASE_URL, () => store.getState().authentication.token, DEFAULT_TIMEOUT);

initializeState(store);
