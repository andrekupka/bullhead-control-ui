import {ShowCollection} from '../../model/Show';
import {createAuthenticatedReducer} from '../authentication/utils';
import {INITIALIZE_SHOWS, ShowActionTypes} from './actions';

export interface ShowState {
    collection: ShowCollection;
}

const INITIAL_STATE: ShowState = {
    collection: [],
};

export const showsReducer = createAuthenticatedReducer((state: ShowState = INITIAL_STATE, action: ShowActionTypes): ShowState => {
    switch (action.type) {
        case INITIALIZE_SHOWS:
            return {
                ...state,
                collection: action.payload.shows
            };
        default:
            return state;
    }
});
