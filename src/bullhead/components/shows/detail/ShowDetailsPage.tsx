import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import React from 'react';
import {ShowDetailsView} from './ShowDetailsView';
import {Redirect, RouteComponentProps} from 'react-router';
import {LoadingPage} from '../../common/LoadingPage';
import {selectRequestError, selectRequestHasSucceeded} from '../../../state/app/http/selectors';
import {ParameterizedHttpResourceLoader, useParameterizedHttpLoader} from '../../../state/app/http/loader';
import {getShowLabel, createShowLoader} from '../../../state/ui/show-details/loader';


interface Params {
    id: string;
}

interface Props {
    showId: string;

    succeeded: boolean;
    error?: Error;

    loader: ParameterizedHttpResourceLoader<string>;
}

const PureShowDetailsPage = (props: Props) => {
    const {showId, succeeded, error, loader} = props;

    useParameterizedHttpLoader(loader, showId);

    if (succeeded) {
        return <ShowDetailsView showId={showId}/>;
        // TODO 404 handling or retry
    } else if (error) {
        return <Redirect to='/shows'/>;
    }
    return <LoadingPage title='Loading show details'/>;
};

type WrapperProps = RouteComponentProps<Params>;

const mapStateToProps = (state: LightBullState, ownProps: WrapperProps) => {
    const showId = ownProps.match.params.id;
    const label = getShowLabel(showId);
    return {
        showId: showId,
        succeeded: selectRequestHasSucceeded(state, label),
        error: selectRequestError(state, label)
    };
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    loader: createShowLoader(dispatch)
});

export const ShowDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowDetailsPage);