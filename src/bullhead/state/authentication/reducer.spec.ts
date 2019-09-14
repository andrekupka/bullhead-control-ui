import {AuthenticationActions} from './actions';
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
        const state = authenticationReducer(createState(), AuthenticationActions.load('something'));

        expect(state).toEqual({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'something',
            authenticationLost: false
        })
    });

    it('should request authentication with progress on request action', () => {
        const state = authenticationReducer(createState(), AuthenticationActions.request());

        expect(state).toMatchObject({
            isAuthenticated: false,
            isAuthenticating: true,
        });
    });

    it('should ignore request action if already authenticated', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: true,
            token: 'something'
        }), AuthenticationActions.request());

        expect(state).toMatchObject({
            isAuthenticated: true,
            isAuthenticating: false,
            token: 'something'
        });
    });

    it('should reset authentication error on request action', () => {
        const state = authenticationReducer(createState({
            authenticationError: 'Invalid password'
        }), AuthenticationActions.request());

        expect(state).toMatchObject({
            authenticationError: undefined
        });
    });

    it('should sign in user, reset progress and store token on success action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
            isAuthenticating: true
        }), AuthenticationActions.success('something'));

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
        }), AuthenticationActions.success('something'));

        expect(state).toMatchObject({
            authenticationLost: false
        });
    });

    it('should show error and reset progress on failure action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
            isAuthenticating: true
        }), AuthenticationActions.failure('Invalid password'));

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
        }), AuthenticationActions.failure('Invalid password'));

        expect(state).toMatchObject({
            authenticationLost: false
        });
    });

    it('should sign out user, remove token and set lost authentication', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: true,
            token: 'something'
        }), AuthenticationActions.lost());

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
        }), AuthenticationActions.clear());

        expect(state).toMatchObject({
            isAuthenticated: false,
            isAuthenticating: false,
            token: undefined
        });
    });
});
