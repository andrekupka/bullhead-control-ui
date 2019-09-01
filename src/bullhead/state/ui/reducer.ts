import {SHOW_NAVIGATION_DRAWER_TYPE, UiActionTypes} from './types';

interface UiState {
    isNavigationOpen: boolean;
}

const INITIAL_STATE: UiState = {
    isNavigationOpen: false
};

export const uiReducer = (state: UiState = INITIAL_STATE, action: UiActionTypes): UiState => {
    switch (action.type) {
        case SHOW_NAVIGATION_DRAWER_TYPE:
            return {
                ...state,
                isNavigationOpen: action.payload.show
            };
        default:
            return state;
    }
};