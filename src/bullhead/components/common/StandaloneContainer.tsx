import {Container, createStyles, makeStyles, Theme} from '@material-ui/core';
import React, {FunctionComponent} from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export const StandaloneContainer: FunctionComponent<{}> = (props) => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
                {props.children}
            </div>
        </Container>
    );
};