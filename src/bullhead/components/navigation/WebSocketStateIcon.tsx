import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';

interface Props {
    isConnected: boolean;
}

export const PureWebSocketStateIcon = (props: Props) => {
    if (props.isConnected) {
        return <SignalWifi4BarIcon/>;
    }
    return <SignalWifiOffIcon/>;
};

const mapStateToProps = (state: LightBullState) => ({
    isConnected: state.webSocket.isConnected
});

export const WebSocketStateIcon = connect(
    mapStateToProps
)(PureWebSocketStateIcon);