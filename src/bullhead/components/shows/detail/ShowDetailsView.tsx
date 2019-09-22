import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {VisualCollection} from '../../../model/Visual';
import {LightBullState} from '../../../state';
import {selectShow} from '../../../state/model/shows/selectors';
import {selectFilteredVisualsOfShow} from '../../../state/model/visuals/selectors';
import {CardGrid} from '../../common/card-grid/CardGrid';
import {ShowDetailsFilterToolbar} from './ShowDetailsFilterToolbar';
import {ShowName} from './ShowName';
import {VisualCard} from './VisualCard';

interface Props {
    show: Show;
    visuals: VisualCollection;
}

const PureShowDetailsView = ({show, visuals}: Props) => {
    const visualCards = visuals.map(visual => ({
        id: visual.id,
        element: <VisualCard visual={visual}/>
    }));

    return (
        <>
            <ShowName show={show}/>
            <ShowDetailsFilterToolbar/>
            <CardGrid cards={visualCards}/>
        </>
    );
};

interface WrapperProps {
    showId: string;
}

const mapStateToProps = (state: LightBullState, {showId}: WrapperProps) => ({
    show: selectShow(state, showId),
    visuals: selectFilteredVisualsOfShow(state, showId)
});

export const ShowDetailsView = connect(
    mapStateToProps,
)(PureShowDetailsView);