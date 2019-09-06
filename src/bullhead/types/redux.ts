import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {LightBullState} from '../state';

export type LightBullThunkDispatch = ThunkDispatch<LightBullState, void, Action>;