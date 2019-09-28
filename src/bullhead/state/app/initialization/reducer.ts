import {combineReducers} from 'redux';
import {createReducer, StateType} from 'typesafe-actions';
import {asResetAwareReducer, ResetAware} from '../../reset/reset-aware-utils';
import {InitializationAction, InitializationActions} from './actions';

const initializationEnabledReducer = createReducer<boolean, ResetAware<InitializationAction>>(false)
    .handleAction(InitializationActions.enable, () => true)
    .handleAction(InitializationActions.disable, () => false);

export const pureInitializationReducer = combineReducers({
    enabled: initializationEnabledReducer,
});

export type InitializationState = StateType<typeof pureInitializationReducer>;

export const initializationReducer = asResetAwareReducer(pureInitializationReducer);
