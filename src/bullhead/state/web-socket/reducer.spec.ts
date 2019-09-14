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
        }), WebSocketActions.disconnected());

        expect(state).toMatchObject({
            isConnected: false,
            isDisconnecting: false,
        });
    });
});
