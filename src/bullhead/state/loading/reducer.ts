import {combineReducers} from 'redux';
import {createReducer, StateType} from 'typesafe-actions';
import {createResettingReducer, ResetAware} from '../reducer-utils';
import {LoadingAction, LoadingActions} from './actions';

export interface LoadingInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

const INITIAL_SHOWS_STATE: LoadingInfo = {
    loading: false,
    loaded: false,
    failed: false
};

const loadingEnabledReducer = createReducer<boolean, ResetAware<LoadingAction>>(false)
    .handleAction(LoadingActions.enable, () => true)
    .handleAction(LoadingActions.disable, () => false);

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

export const pureLoadingReducer = combineReducers({
    enabled: loadingEnabledReducer,
    shows: loadingShowsReducer
});

export type LoadingState = StateType<typeof pureLoadingReducer>;

export const loadingReducer = createResettingReducer(pureLoadingReducer);