import {Visual} from "./Visual";

interface ShowBase {
    id: string;
    name: string;
    favorite: boolean;
}

export interface Show extends ShowBase {
    visuals: Array<string>;
}

export interface ShowWithVisuals extends ShowBase {
    visuals: Array<Visual>
}

export type ShowCollection = Array<Show>;

export type ShowMap = {[showId: string]: Show};
