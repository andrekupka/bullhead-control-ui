import {Grid} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {RouteComponentProps, Redirect} from 'react-router-dom';
import {VisualCollection} from '../../../model/Visual';
import {LightBullState} from '../../../state';
import {selectShow} from '../../../state/model/shows/selectors';
import {selectVisualsOfShow} from '../../../state/model/visuals/selectors';
import {CardGrid} from '../../common/card-grid/CardGrid';
import {VisualCard} from './VisualCard';

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

    const visualCards = props.visuals.map(visual => ({
        id: visual.id,
        element: <VisualCard visual={visual}/>
    }));

    return (
        <div>
            <h1>{props.show.name}</h1>
            <h2>Visuals</h2>
            <CardGrid cards={visualCards} action={<div></div>}/>
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