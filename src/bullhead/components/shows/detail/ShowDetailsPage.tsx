import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import React from 'react';
import {ShowDetailsView} from './ShowDetailsView';
import {Redirect, RouteComponentProps} from 'react-router';
import {LoadingPage} from '../../common/LoadingPage';
import {HttpResourceLoader, useHttpLoader} from '../../../state/app/http/loader';
import {selectHasSucceeded, selectRequestError} from '../../../state/app/http/selectors';
import {createLabel, createShowDetailsLoader} from '../../../state/ui/show-details/loader';


interface Params {
    id: string;
}

interface Props {
    showId: string;

    succeeded: boolean;
    error?: Error;
    loader: HttpResourceLoader;
}

const PureShowDetailsPage = ({showId, succeeded, error, loader}: Props) => {
    useHttpLoader(loader);

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
    const label = createLabel(showId);
    return {
        showId: showId,
        succeeded: selectHasSucceeded(state, label),
        error: selectRequestError(state, label)
    };
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, ownProps: WrapperProps) => ({
    loader: createShowDetailsLoader(dispatch, ownProps.match.params.id)
});

export const ShowDetailsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowDetailsPage);