import {AuthenticationAware} from '../../types/navigation/AuthenticationAware';
import {AuthenticationActionTypes, SIGN_IN, SIGN_OUT} from './types';

interface AuthenticationState extends AuthenticationAware {
    wrongPassword: boolean;
}

const INITIAL_STATE: AuthenticationState = {
    isAuthenticated: false,
    wrongPassword: false,
};

export const authenticationReducer = (state: AuthenticationState = INITIAL_STATE, action: AuthenticationActionTypes): AuthenticationState => {
    switch (action.type) {
        case SIGN_IN:
            const isPasswordCorrect = action.payload.password == 'testpw';
            return {
                ...state,
                wrongPassword: !isPasswordCorrect,
                isAuthenticated: isPasswordCorrect,
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
};
