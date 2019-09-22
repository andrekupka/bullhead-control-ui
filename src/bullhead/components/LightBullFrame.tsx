import {Box} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {selectFinishedLoading} from '../state/app/initialization/selectors';
import {LightBullPageContainer} from './LightBullPageContainer';
import {InitializationView} from './initialization/InitializationView';
import {SnackbarMessageContainer} from './messages/SnackbarMessageContainer';
import {NavigationBar} from './navigation/NavigationBar';

const PureLightBullFrame = ({finishedLoading}: {finishedLoading: boolean}) => {
    if (!finishedLoading) {
        return <InitializationView/>;
    }

    return (
        <Box component='div' display='flex'>
            <NavigationBar/>
            <LightBullPageContainer/>
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