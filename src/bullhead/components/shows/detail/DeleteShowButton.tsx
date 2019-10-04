import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {deleteShowLabel, deleteShowReqeust} from '../../../state/app/shows/requests';
import {LightBullThunkDispatch} from '../../../types/redux';
import {ConfirmingActionButton} from '../../common/ConfirmingActionButton';

interface WrapperProps {
    showId: string;
}

const mapStateToProps = (state: LightBullState, {showId}: WrapperProps) => ({
    hasProgress: selectRequestIsPending(state, deleteShowLabel(showId)),
    actionIcon: DeleteIcon
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, {showId}: WrapperProps) => ({
    performAction: () => dispatch(deleteShowReqeust(showId))
});

export const DeleteShowButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmingActionButton);