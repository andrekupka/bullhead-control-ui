import {combineReducers} from 'redux';
import {createReducer, StateType} from 'typesafe-actions';
import {asResetAwareReducer, ResetAware} from '../reset/reset-aware-utils';
import {LoadingAction, LoadingActions} from './actions';

export interface LoadingInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

const loadingEnabledReducer = createReducer<boolean, ResetAware<LoadingAction>>(false)
    .handleAction(LoadingActions.enable, () => true)
    .handleAction(LoadingActions.disable, () => false);

const INITIAL_SHOWS_STATE: LoadingInfo = {
    loading: false,
    loaded: false,
    failed: false
};

const loadingShowsReducer = createReducer<LoadingInfo, ResetAware<LoadingAction>>(INITIAL_SHOWS_STATE)
    .handleAction(LoadingActions.showsRequest, state => ({
        ...state,
        loading: true,
        failed: false
    }))
    .handleAction(LoadingActions.showsSuccess, state => ({
        ...state,
        loading: false,
        loaded: true
    }))
    .handleAction(LoadingActions.showsFailure, state => ({
        ...state,
        loading: false,
        failed: true
    }));

const INITIAL_VISUALS_STATE: LoadingInfo = {
    loading: false,
    loaded: false,
    failed: false
};

const loadingVisualsReducer = createReducer<LoadingInfo, ResetAware<LoadingAction>>(INITIAL_VISUALS_STATE)
    .handleAction(LoadingActions.visualsRequest, state => ({
        ...state,
        loading: true,
        failed: false
    }))
    .handleAction(LoadingActions.visualsSuccess, state => ({
        ...state,
        loading: false,
        loaded: true
    }))
    .handleAction(LoadingActions.visualsFailure, state => ({
        ...state,
        loading: false,
        failed: true
    }));

export const pureLoadingReducer = combineReducers({
    enabled: loadingEnabledReducer,
    shows: loadingShowsReducer,
    visuals: loadingVisualsReducer
});

export type LoadingState = StateType<typeof pureLoadingReducer>;

export const loadingReducer = asResetAwareReducer(pureLoadingReducer);