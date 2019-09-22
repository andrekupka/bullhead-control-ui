import {connect} from "react-redux";
import {LoadingState} from "../../../state/ui/loading/reducer";
import {LightBullState} from "../../../state";
import {selectShowDetailsLoadingState} from "../../../state/ui/show-details/selectors";
import {LightBullThunkDispatch} from "../../../types/redux";
import {SHOW_DETAILS_LOADING_STATE} from "../../../state/ui/show-details/reducer";
import React from "react";
import {ShowDetailsView} from "./ShowDetailsView";
import {Redirect, RouteComponentProps} from "react-router";
import {loadShow} from "../../../state/ui/show-details/thunks";
import {createResourceLoader, ResourceLoader, useLoader} from "../../../state/ui/loading/hooks";
import {LoadingPage} from "../../common/LoadingPage";


interface Params {
    id: string;
}

interface Props {
    showId: string;
    loadingState: LoadingState;

    loader: ResourceLoader;
}

const PureShowDetailsPage = ({showId, loadingState, loader}: Props) => {
    useLoader(loader);

    if (loadingState.loaded) {
        return <ShowDetailsView showId={showId}/>;
        // TODO 404 handling or retry
    } else if (loadingState.error) {
        return <Redirect to='/shows'/>;
    }
    return <LoadingPage title='Loading show details' loadingState={loadingState}/>;
};

type WrapperProps = RouteComponentProps<Params>;

const mapStateToProps = (state: LightBullState, ownProps: WrapperProps) => ({
    showId: ownProps.match.params.id,
    loadingState: selectShowDetailsLoadingState(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, ownProps: WrapperProps) => ({
    loader: createResourceLoader(dispatch, SHOW_DETAILS_LOADING_STATE, loadShow, ownProps.match.params.id)
});

export const ShowDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowDetailsPage);