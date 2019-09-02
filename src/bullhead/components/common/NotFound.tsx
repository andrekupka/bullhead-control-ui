import {Button, createStyles, makeStyles, Paper, Theme, Typography} from '@material-ui/core';
import {navigate, RouteComponentProps} from '@reach/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    contentAlign: {
        paddingTop: 0,
        textAlign: 'center'
    },
    messagePadding: {
        margin: theme.spacing(2)
    }
}));

export const NotFound = (_: RouteComponentProps) => {
    const classes = useStyles();


    return (
        <div className={classes.contentAlign}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h3'>Page not found</Typography>
            <Typography className={classes.messagePadding} component='p'>
                We're sorry, the page you requested could not be found.
            </Typography>
            <Button variant='contained' color='primary' onClick={() => navigate('/')}>Go to Homepage</Button>
        </div>
    );
};