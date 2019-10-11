import {HttpActions} from '../http/actions';
import {GroupWithParameters, toGroupWithParameterIds} from '../../../model/Group';
import {GroupModelActions} from '../../model/groups/actions';
import {GroupActions} from './actions';
import {showErrorMessage, showSuccessMessage} from '../../ui/messages/thunks';
import {selectGroup} from '../../model/groups/selectors';
import {ModelActions} from '../../model/actions';
import {ParameterCollection} from '../../../model/Parameter';
import {ParameterModelActions} from '../../model/parameters/actions';

export const CREATE_GROUP_LABEL = 'create_group';

export const deleteGroupLabel = (groupId: string) => `delete_group_${groupId}`;

export const createGroupRequest = (visualId: string, effectType: string, parts: Array<string>) =>
    HttpActions.request(CREATE_GROUP_LABEL, {
        method: 'post',
        path: '/api/groups',
        body: {
            visualId: visualId,
            effectType: effectType,
            parts: parts
        },
        successHandler: (response, dispatch) => {
            const groupWithParameters = response as GroupWithParameters;
            const group = toGroupWithParameterIds(groupWithParameters);

            const parameters: ParameterCollection = [];
            groupWithParameters.effect.parameters.forEach(parameter =>
                parameters.push(parameter)
            );

            dispatch(GroupModelActions.add(group));
            dispatch(ParameterModelActions.addAll(parameters));
            dispatch(GroupActions.setNewGroupId(group.id));
        },
        errorHandler: (error, dispatch) => {
            dispatch(showErrorMessage(`Failed to add group: ${error.message}`));
        }
    });

export const deleteGroupRequest = (groupId: string) =>
    HttpActions.request(deleteGroupLabel(groupId), {
        method: 'delete',
        path: `/api/groups/${groupId}`,
        successHandler: (dispatch, getState) => {
            const group = selectGroup(getState(), groupId);
            if (group) {
                dispatch(ModelActions.remove('group', groupId, group.visualId));
                // TODO improve message
                dispatch(showSuccessMessage(`Group ${groupId} has been deleted`));
            }
        }
    });