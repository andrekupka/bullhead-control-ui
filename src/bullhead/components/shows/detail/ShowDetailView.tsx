import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {RouteComponentProps, Redirect} from 'react-router-dom';
import {VisualCollection} from '../../../model/Visual';
import {LightBullState} from '../../../state';
import {selectShow} from '../../../state/model/shows/selectors';
import {selectVisualsOfShow} from '../../../state/model/visuals/selectors';

interface Params {
    id: string;
}

interface Props extends RouteComponentProps<Params> {
    show?: Show;
    visuals: VisualCollection;
}

export const PureShowDetailView = (props: Props) => {
    if (!props.show) {
        return <Redirect to='/shows'/>;
    }
    return (
        <div>
            <h1>{props.show.name}</h1>
            <p>Show with id {props.show.id}</p>
            <div>
                <h3>Visuals</h3>
                {props.visuals.map(visual => <div key={visual.id}>
                    {visual.id} - {visual.name}
                </div>)}
            </div>
        </div>
    );
};

const mapStateToProps = (state: LightBullState, ownProps: Props) => ({
    show: selectShow(state, ownProps.match.params.id),
    visuals: selectVisualsOfShow(state, ownProps.match.params.id)
});

export const ShowDetailView = connect(
    mapStateToProps
)(PureShowDetailView);