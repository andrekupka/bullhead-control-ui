import {Dispatch} from 'react';
import {Api} from '../../store';
import {addShowFailure, addShowRequest, addShowSuccess, pushShow, ShowActionTypes} from './actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowActionTypes>) => {
    dispatch(addShowRequest());
    try {
        const show = await Api.createShow(name);
        dispatch(pushShow(show));
        dispatch(addShowSuccess(show.id));
    } catch (error) {
        dispatch(addShowFailure(error.message));
    }
};