import {createStyles, List, makeStyles, Theme, Typography} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {LoadingInfo, LoadingState} from '../../state/loading/reducer';
import {StandaloneContainer} from '../common/StandaloneContainer';
import {LoadingStateItem} from './LoadingStateItem';

interface Props {
    webSocket: LoadingInfo;
    loading: LoadingState;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const PurePreLoadingView = (props: Props) => {
    const classes = useStyles();


    let loadingDataItems = null;
    if (props.loading.enabled) {
        loadingDataItems =
            <>
                <LoadingStateItem loadingText='Loading shows...'
                                  loadedText='Loaded shows!'
                                  failedText='Failed to load shows'
                                  state={props.loading.shows}/>
            </>;
    }

    return (
        <StandaloneContainer>
            <Typography component='h1' variant='h5'>
                Initializing LightBull ...
            </Typography>

            <List className={classes.list}>
                <LoadingStateItem loadingText='Establishing WebSocket connection...'
                                  loadedText='Established WebSocket connection!'
                                  state={props.webSocket}/>
                {loadingDataItems}
            </List>
        </StandaloneContainer>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    webSocket: {
        loading: state.webSocket.isConnecting,
        loaded: state.webSocket.isConnected,
        failed: false
    },
    loading: state.loading
});

export const LoadingView = connect(
    mapStateToProps
)(PurePreLoadingView);