import {createAuthenticationAwareReducer, DeauthAware} from '../authentication/utils';
import {
    LOADING_SHOWS_FAILURE,
    LOADING_SHOWS_REQUEST,
    LOADING_SHOWS_SUCCESS,
    LOADING_ENABLE,
    LoadingActionTypes, LOADING_DISABLE
} from './actions';

export interface LoadingInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

export interface LoadingState {
    enabled: boolean,
    shows: LoadingInfo
}

const INITIAL_STATE: LoadingState = {
    enabled: false,
    shows: {
        loading: false,
        loaded: false,
        failed: false
    }
};

export const loadingReducer = createAuthenticationAwareReducer(
        (state: LoadingState = INITIAL_STATE, action: DeauthAware<LoadingActionTypes>) => {
            switch (action.type) {
                case LOADING_ENABLE:
                    return {
                        ...state,
                        enabled: true
                    };
                case LOADING_DISABLE:
                    return {
                        ...state,
                        enabled: false
                    };
                case LOADING_SHOWS_REQUEST:
                    return {
                        ...state,
                        shows: {
                            ...state.shows,
                            loading: true,
                            failed: false
                        }
                    };
                case LOADING_SHOWS_SUCCESS:
                    return {
                        ...state,
                        shows: {
                            ...state.shows,
                            loading: false,
                            loaded: true
                        }
                    };
                case LOADING_SHOWS_FAILURE:
                    return {
                        ...state,
                        shows: {
                            ...state.shows,
                            loading: false,
                            failed: true
                        }
                    };
                default:
                    return state;
            }
        });