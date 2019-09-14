import {createReducer} from 'typesafe-actions';
import {NavigationAware} from '../../../types/navigation/NavigationAware';
import {NavigationAction, NavigationActions} from './actions';

export interface NavigationState extends NavigationAware {
}

const INITIAL_STATE: NavigationState = {
    navigationWidth: 240,
    isNavigationOpen: true
};

export const navigationReducer = createReducer<NavigationState, NavigationAction>(INITIAL_STATE)
    .handleAction(NavigationActions.show, (state, action) => ({
        ...state,
        isNavigationOpen: action.payload.show
    }));