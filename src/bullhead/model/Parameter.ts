export interface GenericParameter<T, V> {
    id: string;
    key: string;
    name: string;
    type: T;
    current: V;
    value: V;
}

const UINT8_KEY = 'uint8';

export interface UInt8Value {
    value: number;
}

export type UInt8Parameter = GenericParameter<typeof UINT8_KEY, UInt8Value>;

const COLOR_KEY = 'color';

export interface ColorValue {
    r: number;
    g: number;
    b: number;
}

export type ColorParameter = GenericParameter<typeof COLOR_KEY, ColorValue>;

export type Parameter = UInt8Parameter | ColorParameter;

export type ParameterCollection = Array<Parameter>;

export type ParameterMap = {[parameterId: string]: Parameter};