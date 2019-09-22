import {createReducer} from "typesafe-actions";
import {Config} from "../../../model/Config";
import {ConfigModelAction, ConfigModelActions} from "./actions";

export type ConfigState = Config;

const INITIAL_STATE: ConfigState = {
    parts: [],
    effects: {},
    features: []
};

export const configReducer = createReducer<ConfigState, ConfigModelAction>(INITIAL_STATE)
    .handleAction(ConfigModelActions.initialize, (state, action) => action.payload.config);
