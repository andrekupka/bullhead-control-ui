import {AuthenticationError, authenticationFailure, authenticationStart, authenticationSuccess, authenticationClear} from './actions';
import {authenticationReducer} from './reducer';

describe('authentication reducer', () => {
    it('should return not authenticated initial state', () => {
        const state = authenticationReducer(undefined, {} as any);

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false
        });
    });

    it('should start authentication with progress on start action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: false
        }, authenticationStart());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: true
        });
    });

    it('should ignore start action if already authenticated', () => {
        const state = authenticationReducer({
            isAuthenticated: true,
            isAuthenticating: false
        }, authenticationStart());

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
        }, authenticationStart());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: true
        });
    });

    it('should sign in user, reset progress and store token on signInSuccess action', () => {
        const state = authenticationReducer({
            isAuthenticated: false,
            isAuthenticating: true
        }, authenticationSuccess('token'));

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
        }, authenticationFailure(AuthenticationError.WRONG_PASSWORD));

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
        }, authenticationClear());

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false,
            token: undefined
        });
    });
});
