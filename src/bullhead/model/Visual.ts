export interface Visual {
    id: string;
    name: string;
}

export type VisualCollection = Array<Visual>;

export type VisualMap = {[visualId: string]: Visual};