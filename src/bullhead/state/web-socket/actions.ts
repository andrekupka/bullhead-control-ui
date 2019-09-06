export const WEB_SOCKET_CONNECT = '@web-socket/CONNECT';
export const WEB_SOCKET_CONNECTING = '@web-socket/CONNECTING';
export const WEB_SOCKET_CONNECTED = '@web-socket/CONNECTED';
export const WEB_SOCKET_DISCONNECT = '@web-socket/DISCONNECT';
export const WEB_SOCKET_DISCONNECTING = '@web-socket/DISCONNECTING';
export const WEB_SOCKET_DISCONNECTED = '@web-socket/DISCONNECTED';


export const webSocketConnect = () => ({
    type: WEB_SOCKET_CONNECT as typeof WEB_SOCKET_CONNECT
});

export const webSocketConnecting = () => ({
    type: WEB_SOCKET_CONNECTING as typeof WEB_SOCKET_CONNECTING
});

export const webSocketConnected = () => ({
    type: WEB_SOCKET_CONNECTED as typeof WEB_SOCKET_CONNECTED
});

export const webSocketDisconnect = (permanent: boolean = false) => ({
    type: WEB_SOCKET_DISCONNECT as typeof WEB_SOCKET_DISCONNECT,
    payload: {
        permanent: permanent
    }
});

export const webSocketDisconnecting = () => ({
    type: WEB_SOCKET_DISCONNECTING as typeof WEB_SOCKET_DISCONNECTING
});

export const webSocketDisconnected = () => ({
    type: WEB_SOCKET_DISCONNECTED as typeof WEB_SOCKET_DISCONNECTED
});

export type WebSocketConnectType = ReturnType<typeof webSocketConnect>;

export type WebSocketDisconnectType = ReturnType<typeof webSocketDisconnect>;

export type WebSocketActionTypes =
    WebSocketConnectType
    | ReturnType<typeof webSocketConnecting>
    | ReturnType<typeof webSocketConnected>
    | WebSocketDisconnectType
    | ReturnType<typeof webSocketDisconnecting>
    | ReturnType<typeof webSocketDisconnected>;