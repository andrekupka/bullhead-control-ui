export const ADD_SHOW_START = '@ui/shows/START';
export const ADD_SHOW_END = '@ui/shows/END';
export const ADD_SHOW_REQUEST = '@ui/shows/REQUEST';
export const ADD_SHOW_SUCCESS = '@ui/shows/SUCCESS';
export const ADD_SHOW_FAILURE = '@ui/shows/FAILURE';
export const ADD_SHOW_RESET = '@ui/shows/RESET';

export const addShowStart = () => ({
    type: ADD_SHOW_START as typeof ADD_SHOW_START
});

export const addShowEnd = () => ({
    type: ADD_SHOW_END as typeof ADD_SHOW_END
});

export const addShowRequest = () => ({
    type: ADD_SHOW_REQUEST as typeof ADD_SHOW_REQUEST
});

export const addShowSuccess = (showId: string) => ({
    type: ADD_SHOW_SUCCESS as typeof ADD_SHOW_SUCCESS,
    payload: {
        showId: showId
    }
});

export const addShowFailure = (error: string) => ({
    type: ADD_SHOW_FAILURE as typeof ADD_SHOW_FAILURE,
    payload: {
        error: error
    }
});

export const addShowReset = () => ({
    type: ADD_SHOW_RESET as typeof ADD_SHOW_RESET
});

export type ShowActionTypes =
    ReturnType<typeof addShowStart>
    | ReturnType<typeof addShowEnd>
    | ReturnType<typeof addShowRequest>
    | ReturnType<typeof addShowSuccess>
    | ReturnType<typeof addShowFailure>
    | ReturnType<typeof addShowReset>;
