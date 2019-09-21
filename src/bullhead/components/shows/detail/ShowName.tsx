import {Box, createStyles, IconButton, makeStyles, Theme} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {LightBullState} from '../../../state';
import {selectIsShowUpdating} from '../../../state/app/shows/selectors';
import {updateShow} from '../../../state/app/shows/thunks';
import {LightBullThunkDispatch} from '../../../types/redux';
import {EditableName} from '../../common/EditableName';

interface Props {
    show: Show;
    isUpdating: boolean;
    updateShow: (show: Show) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    buttonMargin: {
        marginRight: theme.spacing(2),
        padding: 0
    }
}));

export const PureShowName = ({show, isUpdating, updateShow}: Props) => {
    const classes = useStyles();

    const performUpdate = (name: string) => {
        const newShow = {
            ...show,
            name: name
        };
        updateShow(newShow);
    };

    const favoriteIcon = show.favorite ? <StarIcon fontSize='large'/> : <StarBorderIcon fontSize='large'/>;

    const favoriteButton = (
        <IconButton className={classes.buttonMargin} disabled={isUpdating} onClick={event => {
            event.stopPropagation();
        }}>
            {favoriteIcon}
        </IconButton>
    );

    return <EditableName label='Show name'
                         name={show.name}
                         updateName={name => performUpdate(name)}
                         isUpdating={isUpdating}
                         iconAction={favoriteButton}/>;
};

type OwnProps = Pick<Props, 'show'>

const mapStateToProps = (state: LightBullState, {show}: OwnProps) => ({
    isUpdating: selectIsShowUpdating(state, show.id)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    updateShow: (show: Show) => dispatch(updateShow(show))
});

export const ShowName = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowName);