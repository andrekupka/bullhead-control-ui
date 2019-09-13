export interface Show {
    id: string;
    name: string;
}

export type ShowCollection = Array<Show>;

export type ShowMap = {[showId: string]: Show};
