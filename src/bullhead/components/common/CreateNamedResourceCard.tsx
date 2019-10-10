import {
    Box,
    CardHeader,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    makeStyles,
    TextField
} from '@material-ui/core';
import React, {FormEvent, useState} from 'react';
import {Redirect} from 'react-router';
import {handleEscape} from '../../utils';
import CloseIcon from '@material-ui/icons/Close';
import {CardGridItem} from './card-grid/CardGridItem';
import {useReset} from '../../utils/hooks/useReset';

interface Props {
    close: () => void;

    label: string;

    isPending: boolean;
    successRedirect?: string;

    reset: () => void;
    createResource: (name: string) => void;
}

const useStyles = makeStyles({
    fullWidth: {
        width: '100%'
    },
    header: {
        width: '100%',
        height: '100%'
    }
});

export const CreateNamedResourceCard = (props: Props) => {
    const classes = useStyles();

    const [name, setName] = useState('');
    useReset(props.reset);

    const close = () => {
        props.close();
    };

    if (props.successRedirect) {
        close();
        return <Redirect push to={props.successRedirect}/>;
    }

    const canSubmit = !!name;

    const createResource = (event: FormEvent) => {
        event.preventDefault();
        if (canSubmit) {
            props.createResource(name);
        }
    };

    const nameForm = <Box display='flex' justifyContent='center'>
        {props.isPending ?
            <CircularProgress/> :
            <form onSubmit={createResource} className={classes.fullWidth}>
                <TextField autoFocus
                           label={props.label}
                           fullWidth
                           variant='outlined'
                           value={name}
                           onChange={event => setName(event.target.value)}
                           onKeyDown={handleEscape(() => close())}
                           InputProps={{
                               endAdornment: <IconButton onClick={() => close()}>
                                   <CloseIcon/>
                               </IconButton>
                           }}/>
            </form>
        }
    </Box>;

    return <ClickAwayListener onClickAway={() => close()}>
        <span>
            <CardGridItem showDarkened={props.isPending}>
                <CardHeader title={nameForm} className={classes.header}/>
            </CardGridItem>
        </span>
    </ClickAwayListener>;
};