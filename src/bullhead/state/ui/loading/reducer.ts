import {createReducer} from 'typesafe-actions';
import {LoadingAction, LoadingActions} from './actions';
import {asResetAwareReducer, ResetAware} from "../../reset/reset-aware-utils";

export interface LoadingState {
    enabled: boolean;
    loading: boolean;
    loaded: boolean;
    error?: Error;
}

const INITIAL_LOADING_STATE: LoadingState = {
    enabled: false,
    loading: false,
    loaded: false
};

export const createLoadingStateReducer = (type: string) => asResetAwareReducer(createReducer<LoadingState, ResetAware<LoadingAction>>(INITIAL_LOADING_STATE)
    .handleAction(LoadingActions.enable, (state, action) => {
        if (type === action.payload.type) {
            return {
                ...INITIAL_LOADING_STATE,
                enabled: true
            }
        }
        return state;

    })
    .handleAction(LoadingActions.disable, (state, action) => {
        if (type === action.payload.type) {
            return INITIAL_LOADING_STATE;
        }
        return state;
    })
    .handleAction(LoadingActions.request, (state, action) => {
        if (state.enabled && type === action.payload.type) {
            return {
                ...state,
                loading: true,
                loaded: false,
                error: undefined
            }
        }
        return state;
    })
    .handleAction(LoadingActions.success, (state, action) => {
        if (state.enabled && type === action.payload.type) {
            return {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            }
        }
        return state;
    })
    .handleAction(LoadingActions.failure, (state, action) => {
        if (state.enabled && type === action.payload.type) {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload.error
            }
        }
        return state;
    }));