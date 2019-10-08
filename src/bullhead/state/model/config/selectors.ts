import {LightBullState} from "../../index";

export const selectConfig = (state: LightBullState) => state.model.config;

export const selectParts = (state: LightBullState) => {
    const config = selectConfig(state);
    return config ? config.parts : [];
}
