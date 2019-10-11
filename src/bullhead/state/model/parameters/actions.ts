import {ActionType, createAction} from 'typesafe-actions';
import {ParameterCollection} from '../../../model/Parameter';

export const ParameterModelActions = {
    setAll: createAction('@model/parameters/SET_ALL', action => (parameters: ParameterCollection) =>
        action({parameters})
    ),
    addAll: createAction('@model/parameters/ADD_ALL', action => (parameters: ParameterCollection) =>
        action({parameters})
    )
};

export type ParameterModelAction = ActionType<typeof ParameterModelActions>;