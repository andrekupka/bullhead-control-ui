import {createAuthenticationAwareReducer, DeauthAware} from '../../authentication/utils';
import {
    ADD_SHOW_END,
    ADD_SHOW_FAILURE,
    ADD_SHOW_REQUEST,
    ADD_SHOW_START,
    ADD_SHOW_SUCCESS,
    ShowActionTypes
} from './actions';

export interface UiShowsState {
    isActive: boolean;
    isPending: boolean;
    newShowId?: string;
    error?: string;
}

const INITIAL_ADD_MODE_STATE: UiShowsState = {
    isActive: false,
    isPending: false
};

export const uiShowsReducer = createAuthenticationAwareReducer(
    (state: UiShowsState = INITIAL_ADD_MODE_STATE, action: DeauthAware<ShowActionTypes>): UiShowsState => {
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
