import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BASE_URL, createApi, DEFAULT_TIMEOUT} from './api/client';
import {lightBullReducer, LightBullState} from './state';
import {AuthenticationActions} from './state/authentication/actions';
import {tokenPersistingMiddleware} from './state/authentication/middleware';
import {loadingMiddleware} from './state/loading/middleware';
import {WebSocketActions} from './state/web-socket/actions';
import {webSocketMiddleware} from './state/web-socket/middleware';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const initializeState = (store: Store<LightBullState>) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token !== null) {
        store.dispatch(AuthenticationActions.load(token));
        store.dispatch(WebSocketActions.connect());
    }
};

const initializeStore = () => {
    const middlewares = [
        thunk,
        loadingMiddleware(),
        tokenPersistingMiddleware(LOCAL_STORAGE_TOKEN_KEY),
        webSocketMiddleware()
    ];

    return createStore(
        lightBullReducer,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );
};


export const store = initializeStore();

const headerConfigurer = (headers: any) => {
    const authorizationToken = store.getState().authentication.token;
    if (authorizationToken) {
        headers.Authorization = `Bearer ${authorizationToken}`;
    }
    const connectionId = store.getState().webSocket.connectionId;
    if (connectionId) {
        headers['X-Connection-Id'] = connectionId;
    }
};

export const Api = createApi(BASE_URL, headerConfigurer, DEFAULT_TIMEOUT);

initializeState(store);
