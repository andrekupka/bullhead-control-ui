import React, {FunctionComponent} from 'react';
import {Card, createStyles, makeStyles, Theme, Toolbar} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: {
        display: 'flex'
    }
}));

export const LightBullToolbar: FunctionComponent<{}> = props => {
    const classes = useStyles();

    return <Card>
        <Toolbar className={classes.toolbar}>
            {props.children}
        </Toolbar>
    </Card>;
};