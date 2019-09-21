import {Box} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {selectFinishedLoading} from '../state/loading/selectors';
import {LightBullContentContainer} from './LightBullContentContainer';
import {LoadingView} from './loading/LoadingView';
import {SnackbarMessageContainer} from './messages/SnackbarMessageContainer';
import {NavigationBar} from './navigation/NavigationBar';

const PureLightBullFrame = ({finishedLoading}: {finishedLoading: boolean}) => {
    if (!finishedLoading) {
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
    finishedLoading: selectFinishedLoading(state)
});

export const LightBullFrame = connect(
    mapStateToProps
)(PureLightBullFrame);