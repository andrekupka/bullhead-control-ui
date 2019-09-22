import {createReducer} from "typesafe-actions";
import {Config} from "../../../model/Config";
import {ConfigModelAction, ConfigModelActions} from "./actions";
import {asResetAwareReducer, ResetAware} from "../../reset/reset-aware-utils";

export type ConfigState = Config;

const INITIAL_STATE: ConfigState = {
    parts: [],
    effects: {},
    features: []
};

export const pureConfigReducer = createReducer<ConfigState, ResetAware<ConfigModelAction>>(INITIAL_STATE)
    .handleAction(ConfigModelActions.initialize, (state, action) => action.payload.config);

export const configReducer = asResetAwareReducer(pureConfigReducer);
