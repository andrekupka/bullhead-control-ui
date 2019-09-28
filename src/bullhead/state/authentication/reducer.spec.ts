import {AuthenticationActions} from './actions';
import {authenticationReducer, AuthenticationState, INITIAL_STATE} from './reducer';

const createState = (patch?: Partial<AuthenticationState>): AuthenticationState =>
    Object.assign({}, INITIAL_STATE, patch || {});

describe('authentication reducer', () => {
    it('should return not authenticated initial state', () => {
        const state = authenticationReducer(undefined, {} as any);

        expect(state).toEqual({
            isAuthenticated: false,
            authenticationLost: false
        });
    });

    it('should initialize authentication on load action', () => {
        const state = authenticationReducer(createState(), AuthenticationActions.load('something'));

        expect(state).toEqual({
            isAuthenticated: true,
            token: 'something',
            authenticationLost: false
        })
    });

    it('should sign in user, reset progress and store token on success action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
        }), AuthenticationActions.success('something'));

        expect(state).toMatchObject({
            isAuthenticated: true,
            token: 'something'
        });
    });

    it('should reset lost authentication on success action', () => {
        const state = authenticationReducer(createState({
            authenticationLost: true
        }), AuthenticationActions.success('something'));

        expect(state).toMatchObject({
            authenticationLost: false
        });
    });

    it('should show error and reset progress on failure action', () => {
        const state = authenticationReducer(createState({
            isAuthenticated: false,
        }), AuthenticationActions.failure('Invalid password'));

        expect(state).toMatchObject({
            isAuthenticated: false,
            authenticationError: 'Invalid password'
        });
    });

    it('should reset lost authentication on failure action', () => {
        const state = authenticationReducer(createState({
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
            token: 'token'
        }), AuthenticationActions.clear());

        expect(state).toMatchObject({
            isAuthenticated: false,
            token: undefined
        });
    });
});
