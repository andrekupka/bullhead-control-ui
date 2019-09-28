import {IconButton} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import {EditableName} from '../../common/EditableName';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {updateShowLabel, updateShowRequest} from '../../../state/app/shows/requests';

interface Props {
    show: Show;
    isUpdating: boolean;
    updateShow: (show: Show) => void;
}

export const PureShowName = ({show, isUpdating, updateShow}: Props) => {
    const updateName = (name: string) => {
        const newShow = {
            ...show,
            name: name
        };
        updateShow(newShow);
    };

    const toggleFavorite = () => {
        const newShow = {
            ...show,
            favorite: !show.favorite
        };
        updateShow(newShow);
    };


    const favoriteIcon = show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>;

    const favoriteButton = (
        <IconButton disabled={isUpdating} onClick={event => {
            event.stopPropagation();
            toggleFavorite();
        }}>
            {favoriteIcon}
        </IconButton>
    );

    return <EditableName label='Show name'
                         name={show.name}
                         updateName={name => updateName(name)}
                         isUpdating={isUpdating}
                         iconAction={favoriteButton}/>;
};

type OwnProps = Pick<Props, 'show'>

const mapStateToProps = (state: LightBullState, {show}: OwnProps) => ({
    isUpdating: selectRequestIsPending(state, updateShowLabel(show.id))
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    updateShow: (show: Show) => dispatch(updateShowRequest(show))
});

export const ShowName = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowName);