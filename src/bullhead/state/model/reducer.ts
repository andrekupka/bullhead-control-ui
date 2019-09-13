import {combineReducers} from 'redux';
import {createAuthenticationAwareReducer} from '../authentication/utils';
import {showsReducer} from './shows/reducer';

export const modelReducer = createAuthenticationAwareReducer(combineReducers({
    shows: showsReducer
}));