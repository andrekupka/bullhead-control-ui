import {Card, CardHeader, createStyles, makeStyles, Theme} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
        justifyContent: 'left',
        alignItems: 'center'
    }
}));

export const ShowCard = ({show}: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const classes = useStyles();

    if (shouldOpen) {
        return <Redirect to={`/shows/${show.id}`}/>;
    }

    const favoriteIcon = show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>;
    return (
        <Card className={classes.showCard} onClick={() => setShouldOpen(true)}>
            <CardHeader avatar={favoriteIcon}
                        title={show.name}
                        titleTypographyProps={{
                            variant: 'h5',
                            component: 'div'
                        }}/>
        </Card>
    );
};