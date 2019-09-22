import {createResourceLoadingThunkCreator} from "../loading/thunks";
import {SHOWS_LOADING_STATE} from "./reducer";
import {Api} from "../../../store";
import {ShowModelActions} from "../../model/shows/actions";
import {selectShowsLoadingState} from "./selectors";

export const loadShows = createResourceLoadingThunkCreator(SHOWS_LOADING_STATE, {
    getLoadingState: state => selectShowsLoadingState(state),
    loader: () => Api.loadShows(),
    resourceConsumer: (dispatch, shows) => dispatch(ShowModelActions.initialize(shows))
});