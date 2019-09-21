export interface Show {
    id: string;
    name: string;
    favorite: boolean;
    visualIds: Array<string>;
}

export type ShowCollection = Array<Show>;

export type ShowMap = {[showId: string]: Show};
