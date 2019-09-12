import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {LightBullContentContainer} from './LightBullContentContainer';
import {NavigationBar} from './navigation/NavigationBar';
import {makeStyles} from '@material-ui/core';
import {LoadingView} from './loading/LoadingView';

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
        return <LoadingView/>;
    }

    return (
        <div className={classes.frame}>
            <NavigationBar/>
            <LightBullContentContainer/>
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    finishedLoading: state.loading.shows.loaded && state.webSocket.isAuthenticated
});

export const LightBullFrame = connect(
    mapStateToProps
)(PureLightBullFrame);