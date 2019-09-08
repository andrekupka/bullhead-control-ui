import React from 'react';
import {LightBullContentContainer} from './MainContentContainer';
import {NavigationBar} from './navigation/NavigationBar';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    frame: {
        display: 'flex'
    }
});

export const LightBullFrame = () => {
    const classes = useStyles();

    return (
        <div className={classes.frame}>
            <NavigationBar/>
            <LightBullContentContainer/>
        </div>
    );
};
