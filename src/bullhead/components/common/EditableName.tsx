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
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import React, {FormEvent, useState} from 'react';

interface Props {
    label: string;

    name: string;
    updateName: (name: string) => void;
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

export const EditableName = ({label, name, updateName, isUpdating, iconAction}: Props) => {
    const classes = useStyles();
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(name);


    if (!isEditing) {
        const startEditing = () => setEditing(true);

        return <Typography variant='h4' className={classes.wrapper}>
            {iconAction && <div>
                {iconAction}
            </div>}
            <span onClick={startEditing}
                  className={classNames(classes.title, isUpdating && classes.darken)}>
                {name}
                </span>
            <IconButton disabled={isUpdating} onClick={startEditing}>
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
        event.preventDefault();
        updateName(inputValue);
        stopEditing(false);
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
                           value={inputValue} onChange={event => setInputValue(event.target.value)}
                           InputProps={{
                               endAdornment: closeButton
                           }}/>
            </form>
        </ClickAwayListener>
    </div>;

    /*
    useEffect(() => {
        if (!isEditing) {
            setInputValue(name);
        }
    }, [name, isEditing]);

    if (!isEditing) {
        const startEditing = () => setEditing(true);

        return (
            <Typography variant='h4' className={classes.title}>
                {iconAction}
                <span onClick={startEditing} className={classNames(isUpdating && classes.darken)}>{name}</span>
                <IconButton disabled={isUpdating} onClick={startEditing} className={classes.editIcon}>
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
     */
};