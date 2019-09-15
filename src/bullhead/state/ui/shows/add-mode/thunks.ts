import {Dispatch} from 'react';
import {Api} from '../../../../store';
import {ShowsActions, ShowsAction} from '../../../model/shows/actions';
import {ShowAddModeAction, ShowAddModeActions} from './actions';

export const addShow = (name: string) => async (dispatch: Dispatch<ShowsAction|ShowAddModeAction>) => {
    dispatch(ShowAddModeActions.addRequest());
    try {
        const show = await Api.createShow(name);
        dispatch(ShowsActions.add(show));
        dispatch(ShowAddModeActions.addSuccess(show.id));
    } catch (error) {
        dispatch(ShowAddModeActions.addFailure(error.message));
    }
};