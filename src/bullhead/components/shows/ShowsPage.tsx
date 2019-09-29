import {connect} from 'react-redux';
import React from 'react';
import {LightBullThunkDispatch} from '../../types/redux';
import {LightBullState} from '../../state';
import {ShowsView} from './ShowsView';
import {LoadingPage} from '../common/LoadingPage';
import {selectRequestHasSucceeded} from '../../state/app/http/selectors';
import {HttpResourceLoader, useHttpLoader} from '../../state/app/http/loader';
import {createShowsLoader, SHOWS_LOADING_STATE_LABEL} from '../../state/ui/shows/loader';

interface Props {
    succeeded: boolean;
    loader: HttpResourceLoader;
}

export const PureShowsPage = ({loader, succeeded}: Props) => {
    useHttpLoader(loader);

    if (succeeded) {
        return <ShowsView/>;
    }
    return <LoadingPage title='Loading shows'/>;
};

const mapStateToProps = (state: LightBullState) => ({
    succeeded: selectRequestHasSucceeded(state, SHOWS_LOADING_STATE_LABEL)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    loader: createShowsLoader(dispatch)
});

export const ShowsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowsPage);