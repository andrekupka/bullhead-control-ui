import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../model/Show';
import {RouteComponentProps, Redirect} from 'react-router-dom';
import {LightBullState} from '../../state';

interface Params {
    id: string;
}

interface Props extends RouteComponentProps<Params> {
    show?: Show;
}

export const PureShowDetailView = (props: Props) => {
    if (!props.show) {
        return <Redirect to='/shows'/>;
    }
    return (
        <div>
            <h1>{props.show.name}</h1>
            <p>Show with id {props.show.id}</p>
        </div>
    );
};

const mapStateToProps = (state: LightBullState, ownProps: Props) => {
    return ({
        show: state.shows.collection.find(show => show.id === ownProps.match.params.id)
    });
};

export const ShowDetailView = connect(
    mapStateToProps
)(PureShowDetailView);