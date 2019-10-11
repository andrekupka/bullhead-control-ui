import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {deleteShowLabel, deleteShowRequest} from '../../../state/app/shows/requests';
import {LightBullThunkDispatch} from '../../../types/redux';
import {ConfirmingActionButton} from '../../common/ConfirmingActionButton';
import React from 'react';

interface Props {
    showId: string;
    isDisabled?: boolean;

    hasProgress: boolean;
    deleteShow: (showId: string) => void;
}

const PureDeleteShowButton = ({showId, isDisabled, hasProgress, deleteShow}: Props) =>
    <ConfirmingActionButton hasProgress={hasProgress}
                            performAction={() => deleteShow(showId)}
                            actionIcon={DeleteIcon}
                            isDisabled={isDisabled}/>;

type OwnProps = Pick<Props, 'showId' | 'isDisabled'>;

const mapStateToProps = (state: LightBullState, {showId, isDisabled}: OwnProps) => ({
    showId: showId,
    isDisabled: isDisabled,
    hasProgress: selectRequestIsPending(state, deleteShowLabel(showId)),
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    deleteShow: (showId: string) => dispatch(deleteShowRequest(showId))
});

export const DeleteShowButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureDeleteShowButton);