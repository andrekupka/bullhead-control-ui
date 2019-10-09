import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../action-utils';

export const VisualActions = {
    setNewVisualId: createAction('@app/visuals/SET_NEW_VISUAL_ID', action => (newVisualId: string) =>
        action({newVisualId})),
    resetNewVisualId: createEmptyAction('@app/visuals/RESET_NEW_VISUAL_ID')
};

export type VisualAction = ActionType<typeof VisualActions>;