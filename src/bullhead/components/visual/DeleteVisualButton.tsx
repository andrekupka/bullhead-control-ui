import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import {deleteVisualLabel, deleteVisualRequest} from '../../state/app/visuals/requests';
import {LightBullThunkDispatch} from '../../types/redux';
import {LightBullState} from '../../state';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {ConfirmingActionButton} from '../common/ConfirmingActionButton';
import React from 'react';

interface Props {
    visualId: string;
    isDisabled?: boolean;

    hasProgress: boolean;
    deleteVisual: (visualId: string) => void;
}

const PureDeleteVisualButton = ({visualId, isDisabled, hasProgress, deleteVisual}: Props) =>
    <ConfirmingActionButton hasProgress={hasProgress}
                            performAction={() => deleteVisual(visualId)}
                            actionIcon={DeleteIcon}
                            isDisabled={isDisabled}/>;

type OwnProps = Pick<Props, 'visualId' | 'isDisabled'>;

const mapStateToProps = (state: LightBullState, {visualId, isDisabled}: OwnProps) => ({
    visualId: visualId,
    isDisabled: isDisabled,
    hasProgress: selectRequestIsPending(state, deleteVisualLabel(visualId))
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    deleteVisual: (visualId: string) => dispatch(deleteVisualRequest(visualId))
});

export const DeleteVisualButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureDeleteVisualButton);