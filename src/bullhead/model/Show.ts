import {Visual} from './Visual';

export interface Show {
    id: string;
    name: string;
    favorite: boolean;
}

export interface ShowWithVisualIds extends Show {
    visualIds: Array<string>;
}

export interface ShowWithVisuals extends Show {
    visuals: Array<Visual>
}

export type ShowCollection = Array<ShowWithVisualIds>;

export type ShowMap = {[showId: string]: ShowWithVisualIds};

export const toShowWithVisualIds = (show: ShowWithVisuals): ShowWithVisualIds => ({
    id: show.id,
    name: show.name,
    favorite: show.favorite,
    visualIds: show.visuals.map(visual => visual.id)
});