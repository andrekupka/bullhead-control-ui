export interface Show {
    id: string;
    name: string;
    favorite: boolean;
}

export type ShowCollection = Array<Show>;

export type ShowMap = {[showId: string]: Show};
