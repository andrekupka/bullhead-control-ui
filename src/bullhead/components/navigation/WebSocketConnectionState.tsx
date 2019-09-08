import React from "react";
import {LightBullState} from "../../state";
import {connect} from "react-redux";
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';

interface Props {
    isConnected: boolean;
}

export const PureWebSocketConnectionState = (props: Props) => {
    if (props.isConnected) {
        return <SignalWifi4BarIcon color='inherit'/>
    }
    return <SignalWifiOffIcon color='error'/>
};

const mapStateToProps = (state: LightBullState) => ({
    isConnected: state.webSocket.isConnected
});

export const WebSocketConnectionState = connect(
    mapStateToProps
)(PureWebSocketConnectionState);
