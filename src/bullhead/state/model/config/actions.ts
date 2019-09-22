import {ActionType, createAction} from "typesafe-actions";
import {Config} from "../../../model/Config";

export const ConfigModelActions = {
    initialize: createAction('@model/config/INITIALIZE', action => (config: Config) => action({config}))
};

export type ConfigModelAction = ActionType<typeof ConfigModelActions>;
