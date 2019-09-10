import {createStyles, List, makeStyles, Theme, Typography} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {WebSocketState} from '../../state/web-socket/reducer';
import {LoadingState} from '../../types/types';
import {StandaloneContainer} from '../common/StandaloneContainer';
import {LoadingStateItem} from './LoadingStateItem';

interface Props {
    webSocket: WebSocketState;
    shows: LoadingState;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const PurePreLoadingView = (props: Props) => {
    const classes = useStyles();



    return (
        <StandaloneContainer>
            <Typography component='h1' variant='h5'>
                Initializing LightBull ...
            </Typography>

            <List className={classes.list}>
                <LoadingStateItem loadingText='Establishing WebSocket connection...'
                                  loadedText='Established WebSocket connection!'
                                  isLoaded={props.webSocket.isConnected && props.webSocket.isAuthenticated}/>
                <LoadingStateItem loadingText='Loading shows...'
                                  loadedText='Loaded shows!'
                                  isLoaded={props.shows.loaded}/>
            </List>
        </StandaloneContainer>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    webSocket: state.webSocket,
    shows: {
        ...state.shows
    }
});

export const InitializationView = connect(
    mapStateToProps
)(PurePreLoadingView);