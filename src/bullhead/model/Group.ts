import {EffectWithParameterIds, EffectWithParameters} from './Effect';

export interface Group {
    id: string;
    visualId: string;
    parts: Array<string>;
}

export interface GroupWithParameters extends Group {
    effect: EffectWithParameters;
}

export interface GroupWithParameterIds extends Group {
    effect: EffectWithParameterIds;
}

export type GroupCollection = Array<GroupWithParameterIds>;

export type GroupMap = {[groupId: string]: GroupWithParameterIds};

export const toGroupWithParameterIds = (group: GroupWithParameters): GroupWithParameterIds => ({
    id: group.id,
    visualId: group.visualId,
    parts: group.parts,
    effect: {
        type: group.effect.type,
        parameterIds: group.effect.parameters.map(parameter => parameter.id)
    }
});