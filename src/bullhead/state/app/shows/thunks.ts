import {Dispatch} from 'react';
import {Show} from '../../../model/Show';
import {Api} from '../../../store';
import {ShowModelAction, ShowModelActions} from '../../model/shows/actions';
import {ShowCreateAction, ShowCreateActions} from './create/actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowModelAction | ShowCreateAction>) => {
    dispatch(ShowCreateActions.request());
    try {
        const show = await Api.createShow(name);
        dispatch(ShowModelActions.add(show));
        dispatch(ShowCreateActions.success(show.id));
    } catch (error) {
        dispatch(ShowCreateActions.failure(error.message));
    }
};

export const updateShow = (show: Show) => async (dispatch: Dispatch<ShowModelAction>) => {
    try {
        console.log(show);
        const updatedShow = await Api.updateShow(show);
        dispatch(ShowModelActions.update(updatedShow));
    } catch (error) {
        console.log('What a pitty');
    }
};