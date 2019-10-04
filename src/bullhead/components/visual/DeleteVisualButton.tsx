import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {deleteVisualLabel, deleteVisualRequest} from '../../state/app/visuals/requests';
import {LightBullThunkDispatch} from '../../types/redux';
import {LightBullState} from '../../state';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {ConfirmingActionButton} from '../common/ConfirmingActionButton';

interface WrapperProps {
    showId: string;
    visualId: string;
}

const mapStateToProps = (state: LightBullState, {visualId}: WrapperProps) => ({
    hasProgress: selectRequestIsPending(state, deleteVisualLabel(visualId)),
    actionIcon: DeleteIcon
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, {showId, visualId}: WrapperProps) => ({
    performAction: () => dispatch(deleteVisualRequest(visualId, showId))
});

export const DeleteVisualButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmingActionButton);