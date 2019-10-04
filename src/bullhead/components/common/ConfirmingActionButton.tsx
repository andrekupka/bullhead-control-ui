import React, {useState} from 'react';
import {ClickAwayListener, Fab, IconButton} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

interface Props {
    isDisabled: boolean;
    performAction: () => void;
    actionIcon: React.ComponentType
}

export const ConfirmingActionButton = ({isDisabled, performAction, actionIcon}: Props) => {
    const [isConfirming, setConfirming] = useState(false);

    if (isConfirming) {
        const confirm = () => {
            performAction();
            setConfirming(false);
        };

        return <ClickAwayListener onClickAway={() => setConfirming(false)}>
            <Fab color='secondary' size='medium' disabled={isDisabled} onClick={() => confirm()}>
                <DoneIcon/>
            </Fab>
        </ClickAwayListener>;
    }

    const ActionIcon = actionIcon;

    return <IconButton disabled={isDisabled} onClick={() => setConfirming(true)}>
        <ActionIcon/>
    </IconButton>;
};