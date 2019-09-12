import {CircularProgress, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import React from 'react';
import {LoadingInfo} from '../../state/loading/reducer';

interface Props {
    loadingText: string;
    loadedText: string;
    state: LoadingInfo;
}

const useStyles = makeStyles({
    loadedIcon: {
        color: 'green'
    }
});

export const LoadingStateItem = (props: Props) => {
    const classes = useStyles();

    const getIcon = () => {
        if (props.state.loaded) {
            return <CheckIcon className={classes.loadedIcon}/>;
        }
        return <CircularProgress size={30}/>;
    };

    const getText = () => {
        if (props.state.loaded) {
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