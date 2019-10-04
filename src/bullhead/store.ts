import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getType} from 'typesafe-actions';
import {lightBullReducer, LightBullState} from './state';
import {AuthenticationActions} from './state/authentication/actions';
import {tokenPersistingMiddleware} from './state/authentication/token-persisting-middleware';
import {connectionMiddleware} from './state/connection/connection-middleware';
import {lifecycleMiddleware} from './state/lifecycle-middleware';
import {resetAwareMiddleware} from './state/reset/reset-aware-middleware';
import {WebSocketActions} from './state/web-socket/actions';
import {webSocketMiddleware} from './state/web-socket/web-socket-middleware';
import {httpMiddleware, HttpMiddlewareConfig} from './state/app/http/http-middleware';
import {modelDeletingMiddleware} from './state/model/model-deleting-middleware';

export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const initializeState = (store: Store<LightBullState>) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token !== null) {
        store.dispatch(AuthenticationActions.load(token));
    }
};

const RESETTING_ACTION_TYPES = [
    AuthenticationActions.lost,
    AuthenticationActions.clear,
    WebSocketActions.disconnected]
    .map(creator => getType(creator));

const createHttpMiddleware = () => {
    const headerConfigurer = (headers: any) => {
        const authorizationToken = store.getState().authentication.token;
        if (authorizationToken) {
            headers.Authorization = `Bearer ${authorizationToken}`;
        }
        const connectionId = store.getState().connection.connectionId;
        if (connectionId) {
            headers['X-Lightbull-Connection-Id'] = connectionId;
        }
    };

    const httpConfig: HttpMiddlewareConfig = {
        timeout: 10000,
        interceptors: [
            config => {
                headerConfigurer(config.headers);
                return config;
            }
        ]
    };

    return httpMiddleware(httpConfig);
};

const initializeStore = () => {
    const middlewares = [
        thunk,
        resetAwareMiddleware(RESETTING_ACTION_TYPES),
        lifecycleMiddleware(),
        tokenPersistingMiddleware(LOCAL_STORAGE_TOKEN_KEY),
        createHttpMiddleware(),
        webSocketMiddleware(),
        connectionMiddleware(),
        modelDeletingMiddleware()
    ];

    return createStore(
        lightBullReducer,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
};

export const store = initializeStore();

initializeState(store);
