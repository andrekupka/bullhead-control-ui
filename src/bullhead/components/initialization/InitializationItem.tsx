import {CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';

interface Props {
    initializingText: string;
    initializedText: string;
    failedText?: string;
    initialized: boolean;
    error?: Error;
}

const useStyles = makeStyles({
    loadedIcon: {
        color: 'green'
    },
    failedIcon: {
        color: 'red'
    }
});

export const InitializationItem = (props: Props) => {
    const classes = useStyles();

    const getIcon = () => {
        if (props.error) {
            return <ClearIcon className={classes.failedIcon}/>;
        } else if (props.initialized) {
            return <CheckIcon className={classes.loadedIcon}/>;
        }
        return <CircularProgress size={30}/>;
    };

    const getText = () => {
        if (props.error) {
            if (props.failedText) {
                return `${props.failedText}, retrying shortly...`;
            }
            return 'Retrying shortly...';
        } else if (props.initialized) {
            return props.initializedText;
        }
        return props.initializingText;
    };

    return (
        <ListItem>
            <ListItemIcon>
                {getIcon()}
            </ListItemIcon>
            <ListItemText primary={getText()}/>
        </ListItem>
    );
};