import {Effect} from './Effect';

export interface Group {
    id: string;
    visualId: string;
    parts: Array<string>;
    effect: Effect;
}

export type GroupCollection = Array<Group>;

export type GroupMap = {[groupId: string]: Group};