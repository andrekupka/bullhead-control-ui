import {AuthenticationError, signInFailure, signInStart, signInSuccess, signOut} from './actions';
import {authenticationReducer} from './reducer';

describe('authentication reducer', () => {
    it('should return signed out initial state', () => {
        const state = authenticationReducer(undefined, {} as any);

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

    it('should ignore signInStart action if already authenticated', () => {
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

    it('should sign in user, reset progress and store token on signInSuccess action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: true
        }, signInSuccess('token'));

        expect(state).toEqual({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'token'
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

    it('should sign out user and remove token on signOut action', () => {
        const state = authenticationReducer({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'token'
        }, signOut());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false,
            token: undefined
        });
    });
});