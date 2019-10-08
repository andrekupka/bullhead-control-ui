import {Button, createStyles, makeStyles, Theme} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, {FunctionComponent} from 'react';
import {LightBullToolbar} from './LightBullToolbar';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbarActions: {
        flexGrow: 1,
        '& > *': {
            marginRight: theme.spacing(2)
        }
    },
    button: {
        margin: theme.spacing(1)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(-1)
    }
}));

interface Props {
    hasFilter: boolean;
    onClear: () => void;
}

export const FilterToolbar: FunctionComponent<Props> = props => {
    const classes = useStyles();

    return <LightBullToolbar>
        <div className={classes.toolbarActions}>
            {props.children}
        </div>
        <Button color='secondary' variant='contained'
                className={classes.button}
                disabled={!props.hasFilter}
                onClick={() => props.onClear()}>
            <ClearIcon className={classes.leftIcon}/>
            Clear
        </Button>
    </LightBullToolbar>;
};