import {Dispatch} from 'react';
import {Api} from '../../../store';
import {pushShow, ShowsActionTypes} from '../../model/shows/actions';
import {addShowFailure, addShowRequest, addShowSuccess, ShowActionTypes} from './actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowsActionTypes|ShowActionTypes>) => {
    dispatch(addShowRequest());
    try {
        const show = await Api.createShow(name);
        dispatch(pushShow(show));
        dispatch(addShowSuccess(show.id));
    } catch (error) {
        dispatch(addShowFailure(error.message));
    }
};