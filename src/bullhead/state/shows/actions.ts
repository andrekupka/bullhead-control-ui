export const ADD_SHOW_START = '@add-show/START';
export const ADD_SHOW_END = '@add-show/END';
export const ADD_SHOW_REQUEST = '@add-show/REQUEST';
export const ADD_SHOW_SUCCESS = '@add-show/SUCCESS';
export const ADD_SHOW_FAILURE = '@add-show/FAILURE';
export const ADD_SHOW_RESET = '@add-show/RESET';

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
