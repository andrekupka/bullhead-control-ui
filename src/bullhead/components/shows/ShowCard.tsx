import {CircularProgress, IconButton, Typography} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Show} from '../../model/Show';
import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {TitledActionCardGridItem} from '../common/card-grid/TitledActionCardGridItem';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {updateShowLabel, updateShowRequest} from '../../state/app/shows/requests';

interface Props {
    show: Show;
    isUpdating: boolean;
    isDisabled: boolean;
    toggleFavorite: (show: Show) => void;
}

export const PureShowCard = ({show, isUpdating, isDisabled, toggleFavorite}: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);

    if (shouldOpen) {
        return <Redirect to={`/shows/${show.id}`}/>;
    }

    const disabled = isDisabled || isUpdating;

    const open = () => {
        if (!disabled) {
            setShouldOpen(true);
        }
    };

    const favoriteIcon = show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>;

    const favoriteButton = (
        <IconButton disabled={disabled} onClick={event => {
            toggleFavorite(show);
            event.stopPropagation();
        }}>
            {favoriteIcon}
        </IconButton>
    );

    const title = (
        <>
            <Typography variant='h5' component='div' noWrap>
                {show.name}
            </Typography>
            {isUpdating && <CircularProgress size={32}/>}
        </>
    );

    return (
        <TitledActionCardGridItem title={title}
                                  action={favoriteButton}
                                  isDisabled={disabled}
                                  showHover={!disabled}
                                  onClick={open}/>
    );
};

type OwnProps = Pick<Props, 'show'>

const mapStateToProps = (state: LightBullState, ownProps: OwnProps) => ({
    isUpdating: selectRequestIsPending(state, updateShowLabel(ownProps.show.id))
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    toggleFavorite: (show: Show) => {
        const updatedShow = {
            ...show,
            favorite: !show.favorite
        };
        dispatch(updateShowRequest(updatedShow));
    }
});

export const ShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCard);