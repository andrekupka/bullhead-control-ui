import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {LightBullState} from '../../state';
import React from 'react';
import {ParameterizedHttpResourceLoader, useParameterizedHttpLoader} from '../../state/app/http/loader';
import {LoadingPage} from '../common/LoadingPage';
import {createShowLoader, getShowLabel} from '../../state/ui/show-details/loader';
import {selectRequestHasError, selectRequestHasSucceeded} from '../../state/app/http/selectors';
import {LightBullThunkDispatch} from '../../types/redux';
import {createVisualLoader, getVisualLabel} from '../../state/ui/visual/loader';
import {VisualView} from './VisualView';

interface Params {
    showId: string;
    visualId: string;
}

interface Props {
    showId: string;
    visualId: string;

    succeeded: boolean;
    failed: boolean;

    showLoader: ParameterizedHttpResourceLoader<string>;
    visualLoader: ParameterizedHttpResourceLoader<string>;
}

const PureVisualPage = (props: Props) => {
    const {showId, visualId, succeeded, failed, showLoader, visualLoader} = props;

    useParameterizedHttpLoader(showLoader, showId);
    useParameterizedHttpLoader(visualLoader, visualId);

    if (succeeded) {
        return <VisualView showId={showId} visualId={visualId}/>;
    } else if (failed) {
        return <Redirect push to={`/shows/${showId}`}/>;
    }
    return <LoadingPage title='Loading visual details'/>;
};

type WrapperProps = RouteComponentProps<Params>;

const mapStateToProps = (state: LightBullState, ownProps: WrapperProps) => {
    const {showId, visualId} = ownProps.match.params;

    const showLabel = getShowLabel(showId);
    const visualLabel = getVisualLabel(visualId);

    const succeeded = selectRequestHasSucceeded(state, showLabel) && selectRequestHasSucceeded(state, visualLabel);

    const failed = selectRequestHasError(state, showLabel) || selectRequestHasError(state, visualLabel);

    return {
        showId: showId,
        visualId: visualId,

        succeeded: succeeded,
        failed: failed
    };
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    showLoader: createShowLoader(dispatch),
    visualLoader: createVisualLoader(dispatch)
});

export const VisualPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureVisualPage);