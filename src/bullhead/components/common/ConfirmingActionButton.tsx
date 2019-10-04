import React, {useState} from 'react';
import {CircularProgress, ClickAwayListener, createStyles, Fab, IconButton, makeStyles, Theme} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

interface Props {
    isDisabled?: boolean;
    hasProgress: boolean;
    performAction: () => void;
    actionIcon: React.ComponentType
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        position: 'relative'
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    }
}));

export const ConfirmingActionButton = ({isDisabled, hasProgress, performAction, actionIcon}: Props) => {
    const classes = useStyles();

    const [isConfirming, setConfirming] = useState(false);

    const disabled = (isDisabled || false) || hasProgress;

    if (isConfirming) {
        const confirm = () => {
            performAction();
            setConfirming(false);
        };

        return <ClickAwayListener onClickAway={() => setConfirming(false)}>
            <Fab color='secondary' size='medium' disabled={disabled} onClick={() => confirm()}>
                <DoneIcon/>
            </Fab>
        </ClickAwayListener>;
    }

    const ActionIcon = actionIcon;

    return <div className={classes.wrapper}>
        <IconButton disabled={disabled} onClick={() => setConfirming(true)}>
            <ActionIcon/>
        </IconButton>
        {hasProgress && <CircularProgress size={48} className={classes.progress}/>}
    </div>;
};