import {ShowMap} from '../../../model/Show';
import {createResettingReducer, ResetAware} from '../../utils';
import {INITIALIZE_SHOWS, PUSH_SHOW, ShowsActionTypes} from './actions';

export type ShowsState = ShowMap;


const INITIAL_STATE: ShowsState = {};

export const showsReducer = createResettingReducer(
    (state: ShowsState = INITIAL_STATE, action: ResetAware<ShowsActionTypes>): ShowsState => {
        switch (action.type) {
            case INITIALIZE_SHOWS:
                return action.payload.shows.reduce((acc: ShowsState, val) => {
                    acc[val.id] = val;
                    return acc;
                }, {});
            case PUSH_SHOW:
                console.log('PUSH');
                return {
                    ...state,
                    [action.payload.show.id]: action.payload.show
                };
            default:
                return state;
        }
    });