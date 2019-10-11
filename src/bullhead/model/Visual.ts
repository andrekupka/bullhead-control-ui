import {Group, GroupWithParameters} from './Group';

export interface Visual {
    id: string;
    showId: string;
    name: string;
}

export interface VisualWithGroupIds extends Visual {
    groupIds: Array<string>;
}

export interface VisualWithGroups extends Visual {
    groups: Array<GroupWithParameters>;
}

export type VisualCollection = Array<VisualWithGroupIds>;

export type VisualMap = {[visualId: string]: VisualWithGroupIds};

export const toVisualWithGroupIds = (visual: VisualWithGroups): VisualWithGroupIds => ({
    id: visual.id,
    showId: visual.showId,
    name: visual.name,
    groupIds: visual.groups.map(group => group.id)
});
