import {Button, CircularProgress, createStyles, LinearProgress, makeStyles, Theme} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import React from 'react';

interface Props extends ButtonProps {
    hasProgress?: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    progress: {
        marginTop: -24
    }
}));

export const ProgressAwareButton = (props: Props) => {
    const classes = useStyles();

    const {disabled, ...remainingProps} = props;

    const showProgress = !!props.hasProgress;
    const isDisabled = showProgress || disabled;

    return (
        <div>
            <Button disabled={isDisabled}
                    {...remainingProps}>
                {props.children}
            </Button>
            {showProgress && <LinearProgress color='primary' className={classes.progress}/>}
        </div>
    );
};