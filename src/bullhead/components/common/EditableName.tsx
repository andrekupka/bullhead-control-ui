import {
    CircularProgress,
    ClickAwayListener,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import React, {FormEvent, useEffect, useState} from 'react';

interface Props {
    name: string;
    updateName: (name: string) => void;
    isUpdating: boolean;
}

const useStyles = makeStyles({
    title: {
        cursor: 'pointer'
    },
    darken: {
        filter: 'brightness(70%)'
    },
    shrink: {
        display: 'inline-block',
        height: '48px'
    }
});

export const EditableName = ({name, updateName, isUpdating}: Props) => {
    const classes = useStyles();
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(name);

    useEffect(() => {
        if (!isEditing) {
            setInputValue(name);
        }
    }, [name, isEditing]);

    if (!isEditing) {
        const startEditing = () => setEditing(true);

        return (
            <Typography variant='h4' className={classes.title}>
                <span onClick={startEditing} className={classNames(isUpdating && classes.darken)}>{name}</span>
                <IconButton disabled={isUpdating} onClick={startEditing}>
                    {isUpdating ? <CircularProgress size={24}/> : <EditIcon/>}
                </IconButton>
            </Typography>
        );
    }

    const stopEditing = (reset: boolean = true) => {
        setEditing(false);
        if (reset) {
            setInputValue(name);
        }
    };

    const performUpdate = (event: FormEvent) => {
        event.preventDefault();
        updateName(inputValue);
        stopEditing(false);
    };

    const closeButton = (
        <InputAdornment position='end'>
            <IconButton onClick={() => stopEditing()}>
                <CloseIcon/>
            </IconButton>
        </InputAdornment>
    );

    return (
        <ClickAwayListener onClickAway={() => stopEditing()}>
            <Typography variant='h4' className={classes.shrink}>
                <form onSubmit={event => performUpdate(event)}>
                    <TextField autoFocus
                               variant='outlined'
                               label='Show name'
                               value={inputValue} onChange={event => setInputValue(event.target.value)}
                               InputProps={{
                                   endAdornment: closeButton
                               }}/>
                </form>
            </Typography>
        </ClickAwayListener>
    );
};