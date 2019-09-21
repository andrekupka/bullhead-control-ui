import React from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {Show} from '../../../model/Show';
import {VisualCollection} from '../../../model/Visual';
import {LightBullState} from '../../../state';
import {selectShow} from '../../../state/model/shows/selectors';
import {selectFilteredVisualsOfShow} from '../../../state/model/visuals/selectors';
import {CardGrid} from '../../common/card-grid/CardGrid';
import {ShowDetailsFilterToolbar} from './ShowDetailsFilterToolbar';
import {ShowName} from './ShowName';
import {VisualCard} from './VisualCard';

interface Params {
    id: string;
}

interface Props extends RouteComponentProps<Params> {
    show?: Show;
    visuals: VisualCollection;
}

export const PureShowDetailView = ({show, visuals}: Props) => {
    if (!show) {
        return <Redirect to='/shows'/>;
    }

    const visualCards = visuals.map(visual => ({
        id: visual.id,
        element: <VisualCard visual={visual}/>
    }));

    return (
        <div>
            <ShowName show={show}/>
            <ShowDetailsFilterToolbar/>
            <CardGrid cards={visualCards}/>
        </div>
    );
};

const mapStateToProps = (state: LightBullState, ownProps: Props) => {
    const showId = ownProps.match.params.id;
    return {
        show: selectShow(state, showId),
        visuals: selectFilteredVisualsOfShow(state, showId),
    };
};

export const ShowDetailView = connect(
    mapStateToProps,
)(PureShowDetailView);