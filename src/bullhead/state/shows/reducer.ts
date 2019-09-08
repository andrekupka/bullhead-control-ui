import {Show} from "../../model/Show";
import {LOAD_ALL_SHOWS_BEGIN, LOAD_ALL_SHOWS_FAILURE, LOAD_ALL_SHOWS_SUCCESS, ShowActionTypes} from "./actions";
import {createAuthenticatedReducer} from "../authentication/utils";

export interface ShowsState {
    isLoading: boolean;
    collection: Array<Show>;
}

const INITIAL_STATE = {
    isLoading: false,
    collection: []
};

export const showsReducer = createAuthenticatedReducer((state: ShowsState = INITIAL_STATE, action: ShowActionTypes): ShowsState => {
    switch (action.type) {
        case LOAD_ALL_SHOWS_BEGIN:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_ALL_SHOWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                collection: action.payload.shows
            };
        case LOAD_ALL_SHOWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                collection: []
            };
        default:
            return state;
    }
});
