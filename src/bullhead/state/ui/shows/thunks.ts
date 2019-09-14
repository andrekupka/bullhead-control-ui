import {Dispatch} from 'react';
import {Api} from '../../../store';
import {ShowsActions, ShowsAction} from '../../model/shows/actions';
import {UiShowsAction, UiShowsActions} from './actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowsAction|UiShowsAction>) => {
    dispatch(UiShowsActions.addRequest());
    try {
        const show = await Api.createShow(name);
        dispatch(ShowsActions.add(show));
        dispatch(UiShowsActions.addSuccess(show.id));
    } catch (error) {
        dispatch(UiShowsActions.addFailure(error.message));
    }
};