import {CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import {InitializationInfo} from '../../state/app/initialization/reducer';

interface Props {
    loadingText: string;
    loadedText: string;
    failedText?: string;
    state: InitializationInfo;
}

const useStyles = makeStyles({
    loadedIcon: {
        color: 'green'
    },
    failedIcon: {
        color: 'red'
    }
});

export const InitializationStateItem = (props: Props) => {
    const classes = useStyles();

    const getIcon = () => {
        if (props.state.failed) {
            return <ClearIcon className={classes.failedIcon}/>;
        } else if (props.state.loaded) {
            return <CheckIcon className={classes.loadedIcon}/>;
        }
        return <CircularProgress size={30}/>;
    };

    const getText = () => {
        if (props.state.failed) {
            if (props.failedText) {
                return `${props.failedText}, retrying shortly...`;
            }
            return 'Retrying shortly...';
        } else if (props.state.loaded) {
            return props.loadedText;
        }
        return props.loadingText;
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