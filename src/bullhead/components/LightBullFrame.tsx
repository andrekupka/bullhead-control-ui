import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {LightBullContentContainer} from './LightBullContentContainer';
import {NavigationBar} from './navigation/NavigationBar';
import {makeStyles} from '@material-ui/core';
import {InitializationView} from './initialization/InitializationView';

interface Props {
    finishedLoading: boolean;
}

const useStyles = makeStyles({
    frame: {
        display: 'flex'
    }
});

const PureLightBullFrame = (props: Props) => {
    const classes = useStyles();

    if (!props.finishedLoading) {
        return <InitializationView/>;
    }

    return (
        <div className={classes.frame}>
            <NavigationBar/>
            <LightBullContentContainer/>
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    finishedLoading: state.shows.loaded && state.webSocket.isConnected && state.webSocket.isAuthenticated
});

export const LightBullFrame = connect(
    mapStateToProps
)(PureLightBullFrame);