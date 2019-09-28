import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const VisualCreationActions = {
    setVisualId: createAction('@app/visuals/creation/SET_VISUAL_ID', action => (visualId: string) =>
        action({visualId})),
    reset: createEmptyAction('@app/visuals/creation/RESET')
};

export type VisualCreationAction = ActionType<typeof VisualCreationActions>;