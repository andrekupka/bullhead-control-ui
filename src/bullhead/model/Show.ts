import {Visual} from './Visual';

interface ShowBase {
    id: string;
    name: string;
    favorite: boolean;
}

export interface Show extends ShowBase {
    visualIds: Array<string>;
}

export interface ShowWithVisuals extends ShowBase {
    visuals: Array<Visual>
}

export type ShowCollection = Array<Show>;

export type ShowMap = {[showId: string]: Show};

export const toShowWithVisualIds = (show: ShowWithVisuals): Show => ({
    id: show.id,
    name: show.name,
    favorite: show.favorite,
    visualIds: show.visuals.map(visual => visual.id)
});