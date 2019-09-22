import {connect} from "react-redux";
import React, {useEffect} from "react";
import {LightBullThunkDispatch} from "../../types/redux";
import {LightBullState} from "../../state";
import {ShowCollectionView} from "./ShowCollectionView";
import {LoadingState} from "../../state/ui/loading/reducer";
import {loadShows} from "../../state/ui/shows/thunks";
import {SHOWS_LOADING_STATE} from "../../state/ui/shows/reducer";
import {LoadingActions} from "../../state/ui/loading/actions";
import {selectShowsLoadingState} from "../../state/ui/shows/selectors";

interface Props {
    loadingState: LoadingState

    enter: () => void;
    exit: () => void;
    loadShows: () => void;
}

export const PureShowsPage = ({loadingState, enter, exit, loadShows}: Props) => {
    useEffect(() => {
        enter();
        return () => exit();
    }, [enter, exit]);

    useEffect(() => {
        loadShows();
    }, [loadShows]);

    if (loadingState.loaded) {
        return <ShowCollectionView/>;
    }
    return <div>
        <h1>Loading shows</h1>
    </div>;
};

const mapStateToProps = (state: LightBullState) => ({
    loadingState: selectShowsLoadingState(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    enter: () => dispatch(LoadingActions.enable(SHOWS_LOADING_STATE)),
    exit: () => dispatch(LoadingActions.disable(SHOWS_LOADING_STATE)),
    loadShows: () => dispatch(loadShows())
});

export const ShowsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowsPage);
