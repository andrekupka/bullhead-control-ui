import {combineReducers} from 'redux';
import {createReducer, StateType} from 'typesafe-actions';
import {asResetAwareReducer, ResetAware} from '../reset/reset-aware-utils';
import {LoadingAction, LoadingActions} from './actions';

export type LoadableType = 'config' | 'shows' | 'visuals';

export interface LoadingInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

const loadingEnabledReducer = createReducer<boolean, ResetAware<LoadingAction>>(false)
    .handleAction(LoadingActions.enable, () => true)
    .handleAction(LoadingActions.disable, () => false);

const INITIAL_LOADING_INFO_STATE: LoadingInfo = {
    loading: false,
    loaded: false,
    failed: false
};

const createLoadingInfoReducer = (type: LoadableType) => createReducer<LoadingInfo,LoadingAction>(INITIAL_LOADING_INFO_STATE)
    .handleAction(LoadingActions.request, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: true,
                loaded: false,
                failed: false
            }
        }
        return state;
    })
    .handleAction(LoadingActions.success, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: false,
                loaded: true,
                failed: false
            }
        }
        return state;
    })
    .handleAction(LoadingActions.failure, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: false,
                loaded: false,
                failed: true
            }
        }
        return state;


    });

export const pureLoadingReducer = combineReducers({
    enabled: loadingEnabledReducer,
    config: createLoadingInfoReducer('config'),
    shows: createLoadingInfoReducer('shows'),
    visuals: createLoadingInfoReducer('visuals')
});

export type LoadingState = StateType<typeof pureLoadingReducer>;

export const loadingReducer = asResetAwareReducer(pureLoadingReducer);
