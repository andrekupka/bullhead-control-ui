import {Dispatch} from 'react';
import {Show} from '../../../model/Show';
import {Api} from '../../../store';
import {ShowModelAction, ShowModelActions} from '../../model/shows/actions';
import {ShowCreationAction, ShowCreationActions} from './create/actions';
import {ShowUpdatingAction, ShowUpdatingActions} from './updating/actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowModelAction | ShowCreationAction>) => {
    dispatch(ShowCreationActions.request());
    try {
        const show = await Api.createShow(name);
        dispatch(ShowModelActions.add(show));
        dispatch(ShowCreationActions.success(show.id));
    } catch (error) {
        dispatch(ShowCreationActions.failure(error.message));
    }
};

export const updateShow = (show: Show) => async (dispatch: Dispatch<ShowModelAction | ShowUpdatingAction>) => {
    try {
        dispatch(ShowUpdatingActions.request(show.id));
        const updatedShow = await Api.updateShow(show);
        dispatch(ShowModelActions.update(updatedShow));
    } catch (error) {
        console.log('What a pitty');
    } finally {
        dispatch(ShowUpdatingActions.finish(show.id));
    }
};