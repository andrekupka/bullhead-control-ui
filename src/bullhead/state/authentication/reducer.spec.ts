import {signInFailure, signInStart, signInSuccess, signOut} from './actions';
import {authenticationReducer} from './reducer';
import {AuthenticationError} from './types';

describe('authentication reducer', () => {
    it('should return signed out initial state', () => {
        const state = authenticationReducer(undefined, {});

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false
        });
    });

    it('should start sign in with progress on signInStart action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: false
        }, signInStart());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: true
        });
    });

    it ('should ignore signInStart action if already authenticated', () => {
        const state = authenticationReducer({
            isAuthenticated: true,
            isAuthenticating: false
        }, signInStart());

        expect(state).toEqual({
            isAuthenticated: true,
            isAuthenticating: false
        });
    });

    it('should reset authentication error on signInStart action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: false,
            authenticationError: AuthenticationError.WRONG_PASSWORD
        }, signInStart());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: true
        });
    });

    it('should sign in user and reset progress on signInSuccess action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: true
        }, signInSuccess());

        expect(state).toEqual({
            isAuthenticated: true,
            isAuthenticating: false
        });
    });

    it('should show error and reset progress on signInFailure action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: true
        }, signInFailure(AuthenticationError.WRONG_PASSWORD));

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false,
            authenticationError: AuthenticationError.WRONG_PASSWORD
        });
    });

    it ('should sign out user on signOut action', () => {
        const state = authenticationReducer({
            isAuthenticated: true,
            isAuthenticating: false
        }, signOut());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false
        });
    })
});