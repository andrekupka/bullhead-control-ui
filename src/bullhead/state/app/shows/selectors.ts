import {LightBullState} from '../../index';

export const selectIsShowUpdating = (state: LightBullState, showId: string) => state.app.shows.updating[showId] || false;