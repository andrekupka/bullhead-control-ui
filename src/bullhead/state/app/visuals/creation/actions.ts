import {ActionType, createAction} from 'typesafe-actions';
import {createEmptyAction} from '../../../action-utils';

export const VisualCreationActions = {
    request: createEmptyAction('@app/visuals/creation/REQUEST'),
    success: createAction('@app/visuals/creation/SUCCESS', action => (visualId: string) => action({visualId})),
    failure: createAction('@app/visuals/creation/FAILURE', action => (error: string) => action({error})),
    reset: createEmptyAction('@app/visuals/creation/RESET')
};

export type VisualCreationAction = ActionType<typeof VisualCreationActions>;