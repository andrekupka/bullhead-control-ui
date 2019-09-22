import {connect} from "react-redux";
import {LoadingState} from "../../../state/ui/loading/reducer";
import {LightBullState} from "../../../state";
import {selectShowDetailsLoadingState} from "../../../state/ui/show-details/selectors";
import {LightBullThunkDispatch} from "../../../types/redux";
import {SHOW_DETAILS_LOADING_STATE} from "../../../state/ui/show-details/reducer";
import {LoadingActions} from "../../../state/ui/loading/actions";
import React, {useEffect} from "react";
import {ShowDetailsView} from "./ShowDetailsView";
import {Redirect, RouteComponentProps} from "react-router";
import {loadShow} from "../../../state/ui/show-details/thunks";


interface Params {
    id: string;
}

interface Props {
    showId: string;
    loadingState: LoadingState;

    enter: () => void;
    exit: () => void;
    loadShow: () => void;
}

const PureShowDetailsPage = ({showId, loadingState, enter, exit, loadShow}: Props) => {
    useEffect(() => {
        enter();
        return () => exit();
    }, [enter, exit]);

    useEffect(() => {
        loadShow();
    }, [loadShow]);

    if (loadingState.loaded) {
        return <ShowDetailsView showId={showId}/>;
    } else if (loadingState.error) {
        return <Redirect to='/shows'/>;
    }
    return <div>
        <h1>Loading show details</h1>
    </div>;
};

type WrapperProps = RouteComponentProps<Params>;

const mapStateToProps = (state: LightBullState, ownProps: WrapperProps) => ({
    showId: ownProps.match.params.id,
    loadingState: selectShowDetailsLoadingState(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, ownProps: WrapperProps) => ({
    enter: () => dispatch(LoadingActions.enable(SHOW_DETAILS_LOADING_STATE)),
    exit: () => dispatch(LoadingActions.disable(SHOW_DETAILS_LOADING_STATE)),
    loadShow: () => dispatch(loadShow(ownProps.match.params.id))
});

export const ShowDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowDetailsPage);