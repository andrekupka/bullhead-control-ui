import {Dispatch} from "react";
import {loadAllShowsBegin, loadAllShowsFailure, loadAllShowsSuccess, ShowActionTypes} from "./actions";
import {Api} from "../../api/client";

export const loadAllShows = () => async (dispatch: Dispatch<ShowActionTypes>) => {
    dispatch(loadAllShowsBegin());
    try {
        const shows = await Api.loadShows();
        dispatch(loadAllShowsSuccess(shows));
    } catch (error) {
        dispatch(loadAllShowsFailure());
    }
};
