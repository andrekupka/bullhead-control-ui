import {Button, CircularProgress, createStyles, makeStyles, Theme} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';
import {green} from '@material-ui/core/colors';
import React from 'react';

interface Props extends ButtonProps {
    hasProgress?: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        position: 'relative'
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

export const ProgressAwareButton = (props: Props) => {
    const classes = useStyles();

    const {disabled, hasProgress, ...remainingProps} = props;

    const showProgress = !!hasProgress;
    const isDisabled = showProgress || disabled;

    return (
        <div className={classes.wrapper}>
            <Button disabled={isDisabled}
                    {...remainingProps}>
                {props.children}
            </Button>
            {showProgress && <CircularProgress size={24} className={classes.progress}/>}
        </div>
    );
};