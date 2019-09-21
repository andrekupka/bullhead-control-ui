import {Button, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
    contentAlign: {
        paddingTop: 0,
        textAlign: 'center'
    },
    messagePadding: {
        margin: theme.spacing(2)
    }
}));

export const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.contentAlign}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h3'>Page not found</Typography>
            <Typography className={classes.messagePadding} component='p'>
                We're sorry, the page you requested could not be found.
            </Typography>
            <Button variant='contained' color='primary' component={Link} to='/'>
                Go to Homepage
            </Button>
        </div>
    );
};