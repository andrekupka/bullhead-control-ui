export const WEB_SOCKET_CONNECT = '@web-socket/CONNECT';
export const WEB_SOCKET_CONNECTED = '@web-socket/CONNECTED';
export const WEB_SOCKET_AUTHENTICATE = '@web-socket/AUTHENTICATE';
export const WEB_SOCKET_AUTHENTICATED = '@web-socket/AUTHENTICATED';
export const WEB_SOCKET_DISCONNECT = '@web-socket/DISCONNECT';
export const WEB_SOCKET_DISCONNECTED = '@web-socket/DISCONNECTED';


export const webSocketConnect = () => ({
    type: WEB_SOCKET_CONNECT as typeof WEB_SOCKET_CONNECT
});

export const webSocketConnected = () => ({
    type: WEB_SOCKET_CONNECTED as typeof WEB_SOCKET_CONNECTED
});

export const webSocketAuthenticate = () => ({
    type: WEB_SOCKET_AUTHENTICATE as typeof WEB_SOCKET_AUTHENTICATE
});

export const webSocketAuthenticated = (connectionId: string) => ({
    type: WEB_SOCKET_AUTHENTICATED as typeof WEB_SOCKET_AUTHENTICATED,
    payload: {
        connectionId: connectionId
    }
});

export const webSocketDisconnect = (permanent: boolean = false) => ({
    type: WEB_SOCKET_DISCONNECT as typeof WEB_SOCKET_DISCONNECT,
    payload: {
        permanent: permanent
    }
});

export const webSocketDisconnected = () => ({
    type: WEB_SOCKET_DISCONNECTED as typeof WEB_SOCKET_DISCONNECTED
});

export type WebSocketActionTypes =
    ReturnType<typeof webSocketConnect>
    | ReturnType<typeof webSocketConnected>
    | ReturnType<typeof webSocketAuthenticate>
    | ReturnType<typeof webSocketAuthenticated>
    | ReturnType<typeof webSocketDisconnect>
    | ReturnType<typeof webSocketDisconnected>;
