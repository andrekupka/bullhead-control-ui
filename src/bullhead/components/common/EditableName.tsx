import CloseIcon from '@material-ui/icons/Close';
import {
    CircularProgress,
    ClickAwayListener,
    createStyles,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import React, {FormEvent, useEffect, useState} from 'react';
import {handleEscape} from '../../utils';

interface Props {
    label: string;

    name: string;
    updateName: (name: string) => void;
    isDisabled: boolean;
    isUpdating: boolean;

    iconAction?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        height: 48,
        display: 'flex',
        alignItems: 'center'
    },

    title: {
        cursor: 'pointer'
    },

    shrink: {
        display: 'inline-block'
    },

    darken: {
        filter: 'brightness(70%)'
    }
}));

export const EditableName = ({label, name, updateName, isDisabled, isUpdating, iconAction}: Props) => {
    const classes = useStyles();
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(name);

    useEffect(() => {
        if (!isEditing) {
            setInputValue(name);
        }
    }, [name, isEditing]);

    if (!isEditing) {
        const startEditing = () => {
            if (!isDisabled) {
                setEditing(true);
            }
        };

        return <Typography variant='h4' className={classes.wrapper}>
            {iconAction && <div>
                {iconAction}
            </div>}
            <span onClick={startEditing}
                  className={classNames(classes.title, (isUpdating || isDisabled) && classes.darken)}>
                {name}
                </span>
            <IconButton disabled={isDisabled} onClick={startEditing}>
                <EditIcon/>
            </IconButton>
            {isUpdating && <CircularProgress/>}
        </Typography>;
    }

    const stopEditing = (reset: boolean = true) => {
        setEditing(false);
        if (reset) {
            setInputValue(name);
        }
    };

    const performUpdate = (event: FormEvent) => {
        if (!isDisabled) {
            event.preventDefault();
            updateName(inputValue);
            stopEditing(false);
        }
    };

    const closeButton = <InputAdornment position='end'>
        <IconButton onClick={() => stopEditing()}>
            <CloseIcon/>
        </IconButton>
    </InputAdornment>;

    return <div className={classes.wrapper}>
        <ClickAwayListener onClickAway={() => stopEditing()}>
            <form onSubmit={event => performUpdate(event)}>
                <TextField autoFocus
                           variant='outlined'
                           label={label}
                           value={inputValue}
                           disabled={isDisabled}
                           onChange={event => setInputValue(event.target.value)}
                           onKeyDown={handleEscape(() => stopEditing())}
                           InputProps={{
                               endAdornment: closeButton
                           }}/>
            </form>
        </ClickAwayListener>
    </div>;
};