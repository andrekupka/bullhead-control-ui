import {CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';

interface Props {
    loadingText: string;
    loadedText: string;
    isLoaded: boolean;
}

const useStyles = makeStyles({
    loadedIcon: {
        color: 'green'
    }
});

export const LoadingStateItem = (props: Props) => {
    const classes = useStyles();

    const getIcon = () => {
        if (props.isLoaded) {
            return <CheckIcon className={classes.loadedIcon}/>;
        }
        return <CircularProgress size={30}/>;
    };

    const getText = () => {
        if (props.isLoaded) {
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