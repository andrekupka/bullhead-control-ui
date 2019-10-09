import {HttpActions} from '../http/actions';
import {Group} from '../../../model/Group';
import {GroupModelActions} from '../../model/groups/actions';
import {GroupActions} from './actions';
import {showErrorMessage} from '../../ui/messages/thunks';

export const CREATE_GROUP_LABEL = 'create_group';

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
            const group = response as Group;
            dispatch(GroupModelActions.add(group));
            dispatch(GroupActions.setNewGroupId(group.id));
        },
        errorHandler: (error, dispatch) => {
            dispatch(showErrorMessage(`Failed to add group: ${error.message}`));
        }
    });