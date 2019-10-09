import {LightBullState} from '../../index';
import {selectGroupsOfVisual} from '../groups/selectors';

export const selectConfig = (state: LightBullState) => state.model.config;

export const selectParts = (state: LightBullState) => {
    const config = selectConfig(state);
    return config ? config.parts : [];
};

export const selectAvailableParts = (state: LightBullState, visualId: string) => {
    const groups = selectGroupsOfVisual(state, visualId);
    const parts = new Set(selectParts(state));
    groups.forEach(group => group.parts.forEach(part => parts.delete(part)));
    return Array.from(parts);
}

export const selectEffects = (state: LightBullState) => {
    const config = selectConfig(state);
    return config ? config.effects : {};
};

export const selectEffectName = (state: LightBullState, effectType: string) =>
    selectEffects(state)[effectType] || 'Unknown effect';

export const selectEffectTypes = (state: LightBullState) => Object.keys(selectEffects(state));