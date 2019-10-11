import {ParameterCollection} from './Parameter';

export interface Effect {
    type: string;
}

export interface EffectWithParameters extends Effect {
    parameters: ParameterCollection;
}

export interface EffectWithParameterIds extends Effect {
    parameterIds: Array<string>;
}