import {connect} from 'react-redux';
import {ConfirmingActionButton} from '../../common/ConfirmingActionButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {LightBullState} from '../../../state';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {deleteGroupLabel, deleteGroupRequest} from '../../../state/app/groups/requests';
import {LightBullThunkDispatch} from '../../../types/redux';

interface Props {
    groupId: string;
    isDisabled?: boolean;

    hasProgress: boolean;
    deleteGroup: (groupId: string) => void;
}

const PureDeleteGroupButton = ({groupId, isDisabled, hasProgress, deleteGroup}: Props) =>
    <ConfirmingActionButton hasProgress={hasProgress}
                            performAction={() => deleteGroup(groupId)}
                            actionIcon={DeleteIcon}
                            isDisabled={isDisabled}/>;

type OwnProps = Pick<Props, 'groupId' | 'isDisabled'>;

const mapStateToProps = (state: LightBullState, {groupId, isDisabled}: OwnProps) => ({
    groupId: groupId,
    isDisabled: isDisabled,
    hasProgress: selectRequestIsPending(state, deleteGroupLabel(groupId))
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    deleteGroup: (groupId: string) => dispatch(deleteGroupRequest(groupId))
});

export const DeleteGroupButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureDeleteGroupButton);