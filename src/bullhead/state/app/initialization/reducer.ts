import {combineReducers} from 'redux';
import {createReducer, StateType} from 'typesafe-actions';
import {asResetAwareReducer, ResetAware} from '../../reset/reset-aware-utils';
import {InitializationAction, InitializationActions} from './actions';

export type InitializableType = 'config' | 'visuals';

export interface InitializationInfo {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
}

const initializationEnabledReducer = createReducer<boolean, ResetAware<InitializationAction>>(false)
    .handleAction(InitializationActions.enable, () => true)
    .handleAction(InitializationActions.disable, () => false);

const INITIAL_INITIALIZATION_INFO_STATE: InitializationInfo = {
    loading: false,
    loaded: false,
    failed: false
};

const createInitializationInfoReducer = (type: InitializableType) => createReducer<InitializationInfo,InitializationAction>(INITIAL_INITIALIZATION_INFO_STATE)
    .handleAction(InitializationActions.request, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: true,
                loaded: false,
                failed: false
            }
        }
        return state;
    })
    .handleAction(InitializationActions.success, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: false,
                loaded: true,
                failed: false
            }
        }
        return state;
    })
    .handleAction(InitializationActions.failure, (state, action) => {
        if (type === action.payload.type) {
            return {
                loading: false,
                loaded: false,
                failed: true
            }
        }
        return state;
    });

export const pureInitializationReducer = combineReducers({
    enabled: initializationEnabledReducer,
    config: createInitializationInfoReducer('config'),
    visuals: createInitializationInfoReducer('visuals')
});

export type InitializationState = StateType<typeof pureInitializationReducer>;

export const initializationReducer = asResetAwareReducer(pureInitializationReducer);
