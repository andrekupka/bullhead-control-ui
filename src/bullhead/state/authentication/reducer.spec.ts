import {
    authenticationClear,
    authenticationFailure,
    authenticationLoad,
    authenticationLost,
    authenticationStart,
    authenticationSuccess
} from './actions';
import {authenticationReducer, AuthenticationState, INITIAL_STATE} from './reducer';

const createState = (patch?: Partial<AuthenticationState>): AuthenticationState =>
    Object.assign({}, INITIAL_STATE, patch || {});

describe('authentication reducer', () => {
    it('should return not authenticated initial state', () => {
        const state = authenticationReducer(undefined, {} as any);

        expect(state).toEqual({
            isAuthenticated: false,
            isAuthenticating: false,
            authenticationLost: false
        });
    });

    it('should initialize authentication on load action', () => {
        const state = authenticationReducer(createState(), authenticationLoad('something'));

        expect(state).toEqual({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'something',
            authenticationLost: false
        })
    })

    it('should start authentication with progress on start action', () => {
        const state = authenticationReducer(createState(), authenticationStart());

        expect(state).toMatchObject({
            isAuthenticated: false,
            isAuthenticating: true,
        });
    });

    it('should ignore start action if already authenticated', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: true,
            token: 'something'
        }), authenticationStart());

        expect(state).toMatchObject({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'something'
        });
    });

    it('should reset authentication error on start action', () => {
        const state = authenticationReducer(createState({
            authenticationError: 'Invalid password'
        }), authenticationStart());

        expect(state).toMatchObject({
            authenticationError: undefined
        });
    });

    it('should sign in user, reset progress and store token on success action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
            isAuthenticating: true
        }), authenticationSuccess('something'));

        expect(state).toMatchObject({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'something'
        });
    });

    it('should reset lost authentication on success action', () => {
        const state = authenticationReducer(createState({
            isAuthenticating: true,
            authenticationLost: true
        }), authenticationSuccess('something'));

        expect(state).toMatchObject({
            authenticationLost: false
        });
    });

    it('should show error and reset progress on failure action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
            isAuthenticating: true
        }), authenticationFailure('Invalid password'));

        expect(state).toMatchObject({
            isAuthenticated: false,
            isAuthenticating: false,
            authenticationError: 'Invalid password'
        });
    });

    it('should reset lost authentication on failure action', () => {
        const state = authenticationReducer(createState({
            isAuthenticating: true,
            authenticationLost: true,
        }), authenticationFailure('Invalid password'));

        expect(state).toMatchObject({
            authenticationLost: false
        });
    });

    it('should sign out user, remove token and set lost authentication', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: true,
            token: 'something'
        }), authenticationLost());

        expect(state).toMatchObject({
            isAuthenticated: false,
            token: undefined,
            authenticationLost: true
        })
    });

    it('should sign out user and remove token on clear action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'token'
        }), authenticationClear());

        expect(state).toMatchObject({
            isAuthenticated: false,
            isAuthenticating: false,
            token: undefined
        });
    });
});
