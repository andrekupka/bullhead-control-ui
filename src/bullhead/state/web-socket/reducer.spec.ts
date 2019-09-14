import {WebSocketActions} from './actions';
import {INITIAL_STATE, webSocketReducer, WebSocketState} from './reducer';

const createState = (patch?: Partial<WebSocketState>): WebSocketState =>
    Object.assign({}, INITIAL_STATE, patch || {});

describe('web-socket reducer', () => {
    it('should return unconnected as initial state', () => {
        const state = webSocketReducer(undefined, {} as any);

        expect(state).toEqual({
            isConnecting: false,
            isConnected: false,
            isAuthenticating: false,
            isAuthenticated: false,
            isDisconnecting: false
        });
    });

    it('should start connecting on connect action', () => {
        const state = webSocketReducer(createState({
            isConnected: false
        }), WebSocketActions.connect());

        expect(state).toMatchObject({
            isConnected: false,
            isConnecting: true,
        });
    });

    it('should be connected on connected action', () => {
        const state = webSocketReducer(createState({
            isConnected: false,
            isConnecting: true
        }), WebSocketActions.connected());

        expect(state).toMatchObject({
            isConnected: true,
            isConnecting: false,
        });
    });

    it('should start authentication on authenticate action', () => {
        const state = webSocketReducer(createState({
            isConnected: true,
            isConnecting: false
        }), WebSocketActions.authenticate());

        expect(state).toMatchObject({
            isConnected: true,
            isConnecting: false,
            isAuthenticating: true,
            isAuthenticated: false
        });
    });

    it('should ignore authenticate action if not connected', () => {
        const initialState = createState();
        const state = webSocketReducer(initialState, WebSocketActions.authenticate());

        expect(state).toEqual(initialState);
    });

    it('should be authenticated on authenticated action', () => {
        const state = webSocketReducer(createState({
            isConnected: true,
            isConnecting: false,
            isAuthenticating: true
        }), WebSocketActions.authenticated('id1'));

        expect(state).toMatchObject({
            isConnected: true,
            isConnecting: false,
            isAuthenticating: false,
            isAuthenticated: true,
            connectionId: 'id1'
        });
    });

    it('should ignore authenticated action if not connected', () => {
        const initialState = createState();
        const state = webSocketReducer(createState(initialState), WebSocketActions.authenticated('id1'));

        expect(state).toEqual(initialState);
    });

    it('should ignore authenticated action if not authenticating', () => {
        const initialState = createState({
            isConnected: true,
            isAuthenticating: false
        });
        const state = webSocketReducer(initialState, WebSocketActions.authenticated('id1'));

        expect(state).toEqual(initialState);
    });

    it('should start disconnecting on disconnect action if connecting', () => {
        const state = webSocketReducer(createState({
            isConnecting: true
        }), WebSocketActions.disconnect());

        expect(state).toMatchObject({
            isDisconnecting: true
        });
    });

    it('should start disconnecting on disconnect action if connected', () => {
        const state = webSocketReducer(createState({
            isConnected: true
        }), WebSocketActions.disconnect());

        expect(state).toMatchObject({
            isDisconnecting: true
        });
    });

    it('should ignore disconnecting action if not connected or connecting', () => {
        const initialState = createState();
        const state = webSocketReducer(initialState, WebSocketActions.disconnect());

        expect(state).toMatchObject(initialState);
    });

    it ('should be disconnected on disconnected action', () => {
        const state = webSocketReducer(createState({
            isConnected: true,
            isDisconnecting: true,
            connectionId: 'id1'
        }), WebSocketActions.disconnected());

        expect(state).toMatchObject({
            isConnected: false,
            isDisconnecting: false,
            connectionId: undefined
        });
    });
});
