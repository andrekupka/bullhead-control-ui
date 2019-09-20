import {Box} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {LightBullContentContainer} from './LightBullContentContainer';
import {LoadingView} from './loading/LoadingView';
import {SnackbarMessageContainer} from './messages/SnackbarMessageContainer';
import {NavigationBar} from './navigation/NavigationBar';

interface Props {
    finishedLoading: boolean;
}

const PureLightBullFrame = (props: Props) => {
    if (!props.finishedLoading) {
        return <LoadingView/>;
    }

    return (
        <Box component='div' display='flex'>
            <NavigationBar/>
            <LightBullContentContainer/>
            <SnackbarMessageContainer/>
        </Box>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    finishedLoading: state.loading.shows.loaded &&
        state.loading.visuals.loaded &&
        state.connection.connectionId !== undefined
});

export const LightBullFrame = connect(
    mapStateToProps
)(PureLightBullFrame);