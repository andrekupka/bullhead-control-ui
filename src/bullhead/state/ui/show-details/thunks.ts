import {createResourceLoadingThunkCreator} from "../loading/thunks";
import {SHOW_DETAILS_LOADING_STATE} from "./reducer";
import {selectShowDetailsLoadingState} from "./selectors";
import {Api} from "../../../store";
import {ShowModelActions} from "../../model/shows/actions";
import {VisualModelActions} from "../../model/visuals/actions";

export const loadShow = createResourceLoadingThunkCreator(SHOW_DETAILS_LOADING_STATE, {
    getLoadingState: state => selectShowDetailsLoadingState(state),
    loader: (showId?: string) => Api.loadShow(showId!!),
    resourceConsumer: (dispatch, showWithVisuals) => {
        const show = {
            ...showWithVisuals,
            visuals: showWithVisuals.visuals.map(visual => visual.id)
        };
        dispatch(ShowModelActions.set(show));
        dispatch(VisualModelActions.setAll(showWithVisuals.visuals));
    }
});