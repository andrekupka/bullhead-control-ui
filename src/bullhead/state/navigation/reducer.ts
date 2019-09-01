import {NavigationAware} from '../../types/navigation/NavigationAware';
import {SHOW_NAVIGATION, NavigationActionTypes} from './types';

interface NavigationState extends NavigationAware {
}

const INITIAL_STATE: NavigationState = {
    navigationWidth: 240,
    isNavigationOpen: false
};

export const navigationReducer = (state: NavigationState = INITIAL_STATE, action: NavigationActionTypes): NavigationState => {
    switch (action.type) {
        case SHOW_NAVIGATION:
            return {
                ...state,
                isNavigationOpen: action.payload.show
            };
        default:
            return state;
    }
};