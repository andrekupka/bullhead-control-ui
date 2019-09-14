import {createAction, TypeConstant} from 'typesafe-actions';

export const createEmptyAction = <T extends TypeConstant>(type: T) => createAction(type, action => () => action());
