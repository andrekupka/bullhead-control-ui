import {Card, CardHeader, createStyles, IconButton, makeStyles, Theme, Typography} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Show} from '../../model/Show';
import {updateShow} from '../../state/app/shows/thunks';
import {LightBullThunkDispatch} from '../../types/redux';

interface Props {
    show: Show;
    toggleFavorite: (show: Show) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    showCard: {
        display: 'flex',
        '&:hover': {
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);'
        },
        height: '100%',
        justifyContent: 'left',
        alignItems: 'center'
    },
    title: {
        cursor: 'pointer',
        minWidth: '100%'
    }
}));

export const PureShowCard = ({show, toggleFavorite}: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const classes = useStyles();

    if (shouldOpen) {
        return <Redirect to={`/shows/${show.id}`}/>;
    }

    const favoriteIcon = (
        <IconButton onClick={event => {
            toggleFavorite(show);
            event.stopPropagation();
        }}>
            {show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>}
        </IconButton>
    );
    const title = <Typography variant='h5' component='div'>{show.name}</Typography>;

    return (
        <Card className={classes.showCard} onClick={() => setShouldOpen(true)}>
            <CardHeader avatar={favoriteIcon} title={title}/>
        </Card>
    );
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    toggleFavorite: (show: Show) => {
        const updatedShow = {
            ...show,
            favorite: !show.favorite
        };
        dispatch(updateShow(updatedShow));
    }
});

export const ShowCard = connect(
    null,
    mapDispatchToProps
)(PureShowCard);