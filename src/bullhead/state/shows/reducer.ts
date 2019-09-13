import {act} from 'react-dom/test-utils';
import {combineReducers} from 'redux';
import {Show, ShowCollection} from '../../model/Show';
import {createAuthenticationAwareReducer, DeauthAware} from '../authentication/utils';
import {
    ADD_SHOW_FAILURE,
    ADD_SHOW_REQUEST,
    ADD_SHOW_SUCCESS,
    ADD_SHOW_END,
    INITIALIZE_SHOWS, PUSH_SHOW,
    ShowActionTypes,
    ADD_SHOW_START
} from './actions';

export type ShowCollectionState = ShowCollection;

export const showCollectionReducer = createAuthenticationAwareReducer(
    (state: ShowCollectionState = [], action: DeauthAware<ShowActionTypes>): ShowCollectionState => {
        switch (action.type) {
            case INITIALIZE_SHOWS:
                return action.payload.shows;
            case PUSH_SHOW:
                return [...state, action.payload.show];
            default:
                return state;
        }
    });

export interface AddModeState {
    isActive: boolean;
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_ADD_MODE_STATE: AddModeState = {
    isActive: false,
    isPending: false
};

export const addShowModeReducer = createAuthenticationAwareReducer(
    (state: AddModeState = INITIAL_ADD_MODE_STATE, action: DeauthAware<ShowActionTypes>): AddModeState => {
        switch (action.type) {
            case ADD_SHOW_START:
                return {
                    ...state,
                    isActive: true,
                    isPending: false,
                    newShowId: undefined,
                    error: undefined
                };
            case ADD_SHOW_END:
                return {
                    ...state,
                    isActive: false,
                    isPending: false,
                    newShowId: undefined,
                    error: undefined
                };
            case ADD_SHOW_REQUEST:
                return {
                    ...state,
                    isPending: true
                };
            case ADD_SHOW_SUCCESS:
                return {
                    ...state,
                    isPending: false,
                    newShowId: action.payload.showId
                };
            case ADD_SHOW_FAILURE:
                return {
                    ...state,
                    isPending: false,
                    error: action.payload.error
                };
            default:
                return state;
        }
    });

export const showsReducer = combineReducers({
    collection: showCollectionReducer,
    addMode: addShowModeReducer
});
