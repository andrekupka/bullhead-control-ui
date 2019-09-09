import {ShowCollection} from '../../model/Show';
import {LoadingState} from '../../types/types';
import {createAuthenticatedReducer} from '../authentication/utils';
import {LOAD_SHOWS_FAILURE, LOAD_SHOWS_REQUEST, LOAD_SHOWS_SUCCESS, ShowActionTypes} from './actions';

export interface ShowState extends LoadingState {
    collection: ShowCollection;
}

const INITIAL_STATE: ShowState = {
    collection: [],
    loading: false,
    loaded: false,
    failed: false
};

export const showsReducer = createAuthenticatedReducer((state: ShowState = INITIAL_STATE, action: ShowActionTypes): ShowState => {
    switch (action.type) {
        case LOAD_SHOWS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOAD_SHOWS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                failed: false,
                collection: action.payload.shows
            };
        case LOAD_SHOWS_FAILURE:
            return {
                ...state,
                loading: false,
                loaded: false,
                failed: true
            };
        default:
            return state;
    }
});
