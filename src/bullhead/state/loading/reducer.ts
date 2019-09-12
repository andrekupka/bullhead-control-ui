import {createAuthenticatedReducer} from '../authentication/utils';
import {LOAD_SHOWS_FAILURE, LOAD_SHOWS_REQUEST, LOAD_SHOWS_SUCCESS, LoadingActionTypes} from './actions';

export interface LoadingInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

export interface LoadingState {
    shows: LoadingInfo
}

const INITIAL_STATE: LoadingState = {
    shows: {
        loading: false,
        loaded: false,
        failed: false
    }
};

export const loadingReducer = createAuthenticatedReducer(((state: LoadingState = INITIAL_STATE, action: LoadingActionTypes) => {
    switch (action.type) {
        case LOAD_SHOWS_REQUEST:
            return {
                ...state,
                shows: {
                    ...state.shows,
                    loading: true,
                    failed: false
                }
            };
        case LOAD_SHOWS_SUCCESS:
            return {
                ...state,
                shows: {
                    ...state.shows,
                    loading: false,
                    loaded: true
                }
            };
        case LOAD_SHOWS_FAILURE:
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
}));