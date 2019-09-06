export const WEB_SOCKET_CONNECT = '@web-socket/CONNECT';
export const WEB_SOCKET_CONNECTING = '@web-socket/CONNECTING';
export const WEB_SOCKET_CONNECTED = '@web-socket/CONNECTED';
export const WEB_SOCKET_DISCONNECT = '@web-socket/DISCONNECT';
export const WEB_SOCKET_DISCONNECTING = '@web-socket/DISCONNECTING';
export const WEB_SOCKET_DISCONNECTED = '@web-socket/DISCONNECTED';


export const webSocketConnect = (host: string) => ({
    type: WEB_SOCKET_CONNECT as typeof WEB_SOCKET_CONNECT,
    payload: {
        host: host
    }
});

export const webSocketConnecting = () => ({
    type: WEB_SOCKET_CONNECTING as typeof WEB_SOCKET_CONNECTING
});

export const webSocketConnected = () => ({
    type: WEB_SOCKET_CONNECTED as typeof WEB_SOCKET_CONNECTED
});

export const webSocketDisconnect = () => ({
    type: WEB_SOCKET_DISCONNECT as typeof WEB_SOCKET_DISCONNECT
});

export const webSocketDisconnecting = () => ({
    type: WEB_SOCKET_DISCONNECTING as typeof WEB_SOCKET_DISCONNECTING
});

export const webSocketDisconnected = () => ({
    type: WEB_SOCKET_DISCONNECTED as typeof WEB_SOCKET_DISCONNECTED
});

export type WebSocketActionTypes =
    ReturnType<typeof webSocketConnect>
    | ReturnType<typeof webSocketConnecting>
    | ReturnType<typeof webSocketConnected>
    | ReturnType<typeof webSocketDisconnect>
    | ReturnType<typeof webSocketDisconnecting>
    | ReturnType<typeof webSocketDisconnected>;