import {combineReducers} from 'redux';
import {Show, ShowCollection} from '../../model/Show';
import {createAuthenticationAwareReducer, DeauthAware} from '../authentication/utils';
import {
    ADD_SHOW_FAILURE,
    ADD_SHOW_REQUEST,
    ADD_SHOW_SUCCESS,
    END_ADD_SHOW,
    INITIALIZE_SHOWS,
    ShowActionTypes,
    START_ADD_SHOW
} from './actions';

export type ShowCollectionState = ShowCollection;

export const showCollectionReducer = createAuthenticationAwareReducer(
    (state: ShowCollectionState = [], action: DeauthAware<ShowActionTypes>): ShowCollectionState => {
        switch (action.type) {
            case INITIALIZE_SHOWS:
                return action.payload.shows;
            case ADD_SHOW_SUCCESS:
                return state.concat(action.payload.show);
            default:
                return state;
        }
    });

export interface AddModeState {
    isActive: boolean;
    isPending: boolean;
    newShow?: Show;
    error?: string;
}

const INITIAL_ADD_MODE_STATE: AddModeState = {
    isActive: false,
    isPending: false
};

export const addShowModeReducer = createAuthenticationAwareReducer(
    (state: AddModeState = INITIAL_ADD_MODE_STATE, action: DeauthAware<ShowActionTypes>): AddModeState => {
        switch (action.type) {
            case START_ADD_SHOW:
                return {
                    ...state,
                    isActive: true,
                    isPending: false,
                    newShow: undefined,
                    error: undefined
                };
            case END_ADD_SHOW:
                return {
                    ...state,
                    isActive: false,
                    isPending: false,
                    newShow: undefined,
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
                    newShow: action.payload.show
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
