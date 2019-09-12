import {Dispatch} from 'react';
import {Api} from '../../store';
import {addShowFailure, addShowRequest, addShowSuccess, ShowActionTypes} from './actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowActionTypes>) => {
    dispatch(addShowRequest());
    try {
        const show = await Api.createShow(name);
        dispatch(addShowSuccess(show));
    } catch (error) {
        dispatch(addShowFailure(error.message));
    }
};