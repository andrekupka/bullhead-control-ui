import {
    Box,
    Card,
    CardHeader,
    CircularProgress,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import classNames from 'classnames';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Show} from '../../model/Show';
import {LightBullState} from '../../state';
import {selectIsShowUpdating} from '../../state/app/shows/selectors';
import {updateShow} from '../../state/app/shows/thunks';
import {LightBullThunkDispatch} from '../../types/redux';

interface Props {
    show: Show;
    isUpdating: boolean;
    toggleFavorite: (show: Show) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    showCard: {
        display: 'flex',
        height: '100%',
        justifyContent: 'left',
        alignItems: 'center'
    },
    showCardHover: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);'
        }
    },
    header: {
        width: '100%',
        height: '100%'
    },
    darken: {
        filter: 'brightness(80%)'
    },
    title: {
        flexGrow: 1
    }
}));

export const PureShowCard = ({show, isUpdating, toggleFavorite}: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    const classes = useStyles();

    if (shouldOpen) {
        return <Redirect to={`/shows/${show.id}`}/>;
    }

    const open = () => {
        if (!isUpdating) {
            setShouldOpen(true);
        }
    };

    const favoriteIcon = show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>;

    const favoriteButton = (
        <IconButton disabled={isUpdating} onClick={event => {
            toggleFavorite(show);
            event.stopPropagation();
        }}>
            {favoriteIcon}
        </IconButton>
    );

    const title = (
        <Box display='flex' flexDirection='horizontal'>
            <Typography variant='h5' component='div' noWrap className={classes.title}>
                {show.name}
            </Typography>
            {isUpdating && <CircularProgress size={32}/>}
        </Box>
    );

    const cardClasses = classNames(classes.showCard, isUpdating && classes.darken, !isUpdating && classes.showCardHover);

    return (
        <Card className={cardClasses} onClick={open}>
            <CardHeader className={classes.header} avatar={favoriteButton} title={title} disableTypography/>
        </Card>
    );
};

type OwnProps = Pick<Props, 'show'>

const mapStateToProps = (state: LightBullState, ownProps: OwnProps) => ({
    isUpdating: selectIsShowUpdating(state, ownProps.show.id)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    toggleFavorite: (show: Show) => {
        const updatedShow = {
            ...show,
            favorite: !show.favorite
        };
        dispatch(updateShow(updatedShow));
    },
});

export const ShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCard);