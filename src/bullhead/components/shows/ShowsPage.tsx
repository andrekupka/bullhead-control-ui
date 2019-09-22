import {connect} from "react-redux";
import React from "react";
import {LightBullThunkDispatch} from "../../types/redux";
import {LightBullState} from "../../state";
import {ShowCollectionView} from "./ShowCollectionView";
import {LoadingState} from "../../state/ui/loading/reducer";
import {loadShows} from "../../state/ui/shows/thunks";
import {SHOWS_LOADING_STATE} from "../../state/ui/shows/reducer";
import {selectShowsLoadingState} from "../../state/ui/shows/selectors";
import {createResourceLoader, ResourceLoader, useLoader} from "../../state/ui/loading/hooks";
import {LoadingPage} from "../common/LoadingPage";

interface Props {
    loadingState: LoadingState

    loader: ResourceLoader,
}

export const PureShowsPage = ({loadingState, loader}: Props) => {
    useLoader(loader);

    if (loadingState.loaded) {
        return <ShowCollectionView/>;
    }
    return <LoadingPage title='Loading shows' loadingState={loadingState}/>;
};

const mapStateToProps = (state: LightBullState) => ({
    loadingState: selectShowsLoadingState(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    loader: createResourceLoader(dispatch, SHOWS_LOADING_STATE, loadShows)
});

export const ShowsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowsPage);
