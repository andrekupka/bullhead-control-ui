import {ParameterMap} from '../../../model/Parameter';
import {createReducer} from 'typesafe-actions';
import {ModelAction, ModelActions} from '../actions';
import {ParameterModelActions} from './actions';

export type ParametersState = ParameterMap;

const INITIAL_STATE: ParametersState = {};

export const parametersReducer = createReducer<ParametersState, ModelAction>(INITIAL_STATE)
    .handleAction(ParameterModelActions.setAll, (state, action) =>
        action.payload.parameters.reduce((acc: ParametersState, parameter) => {
            acc[parameter.id] = parameter;
            return acc;
        }, {})
    )
    .handleAction(ParameterModelActions.addAll, (state, action) => {
        const newState = {...state};
        action.payload.parameters.forEach(parameter =>
            newState[parameter.id] = parameter
        );
        return newState;
    })
    .handleAction(ModelActions.removeRecursive, (state, action) => {
        const parameterIds = action.payload.relatedIds['parameter'];
        if (parameterIds) {
            const newState = {...state};
            parameterIds.forEach(parameterId => {
                delete newState[parameterId.id];
            });
            return newState;
        }
        return state;
    });