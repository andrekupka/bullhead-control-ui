export type EffectMap = {[type: string]: string};

export interface Config {
    parts: Array<string>,
    effects: EffectMap,
    features: Array<string>,
}
