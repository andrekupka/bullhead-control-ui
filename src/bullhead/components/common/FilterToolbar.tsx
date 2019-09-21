import {Button, Card, createStyles, makeStyles, Theme, Toolbar} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, {FunctionComponent} from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: {
        display: 'flex'
    },
    toolbarActions: {
        flexGrow: 1,
        '& > *': {
            marginRight: theme.spacing(2)
        }
    },
    button: {
        margin: theme.spacing(1),
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

export const FilterToolbar: FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    return (
        <Card>
            <Toolbar className={classes.toolbar}>
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
            </Toolbar>
        </Card>
    );
};