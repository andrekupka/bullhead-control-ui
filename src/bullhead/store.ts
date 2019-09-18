import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {BASE_URL, createApi, DEFAULT_TIMEOUT} from './api/client';
import {lightBullReducer, LightBullState} from './state';
import {AuthenticationActions} from './state/authentication/actions';
import {tokenPersistingMiddleware} from './state/authentication/token-persisting-middleware';
import {connectionMiddleware} from './state/connection/connection-middleware';
import {lifecycleMiddleware} from './state/lifecycle-middleware';
import {resetAwareMiddleware} from './state/reset/reset-aware-middleware';
import {webSocketMiddleware} from './state/web-socket/web-socket-middleware';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const initializeState = (store: Store<LightBullState>) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token !== null) {
        store.dispatch(AuthenticationActions.load(token));
    }
};

const initializeStore = () => {
    const middlewares = [
        thunk,
        resetAwareMiddleware(),
        lifecycleMiddleware(),
        tokenPersistingMiddleware(LOCAL_STORAGE_TOKEN_KEY),
        webSocketMiddleware(),
        connectionMiddleware()
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
    const connectionId = store.getState().connection.connectionId;
    if (connectionId) {
        headers['X-Connection-Id'] = connectionId;
    }
};

export const Api = createApi(BASE_URL, headerConfigurer, DEFAULT_TIMEOUT);

initializeState(store);
