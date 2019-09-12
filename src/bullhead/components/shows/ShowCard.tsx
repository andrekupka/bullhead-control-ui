import {Card, CardContent, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Show} from '../../model/Show';

interface Props {
    show: Show;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    showCard: {
        display: 'flex',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);'
        },
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export const ShowCard = (props: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const classes = useStyles();

    if (shouldOpen) {
        return <Redirect to={`/shows/${props.show.id}`}/>;
    }

    return (
        <Card className={classes.showCard} onClick={() => setShouldOpen(true)}>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {props.show.name}
                </Typography>
            </CardContent>
        </Card>
    );
};