import {createStyles, List, makeStyles, Theme, Typography} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {InitializationInfo, InitializationState} from '../../state/app/initialization/reducer';
import {StandaloneContainer} from '../common/StandaloneContainer';
import {InitializationStateItem} from './InitializationStateItem';

interface Props {
    webSocket: InitializationInfo;
    initialization: InitializationState;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    list: {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const PureInitializationView = (props: Props) => {
    const classes = useStyles();

    let initializationDataItems = null;
    if (props.initialization.enabled) {
        initializationDataItems =
            <>
                <InitializationStateItem loadingText='Loading config...'
                                         loadedText='Loaded config!'
                                         failedText='Failed to load config'
                                         state={props.initialization.config}/>
            </>;
    }

    return (
        <StandaloneContainer>
            <Typography component='h1' variant='h5'>
                Initializing LightBull ...
            </Typography>

            <List className={classes.list}>
                <InitializationStateItem loadingText='Establishing WebSocket connection...'
                                         loadedText='Established WebSocket connection!'
                                         state={props.webSocket}/>
                {initializationDataItems}
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
    initialization: state.app.initialization,
});

export const InitializationView = connect(
    mapStateToProps
)(PureInitializationView);
