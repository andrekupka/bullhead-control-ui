import {Show} from '../../model/Show';
import {Visual} from '../../model/Visual';
import {LightBullState} from '../../state';
import {selectShow} from '../../state/model/shows/selectors';
import {selectVisual} from '../../state/model/visuals/selectors';
import {connect} from 'react-redux';
import React from 'react';

interface Props {
    show: Show;
    visual: Visual;
}

const PureVisualView = (props: Props) => {
    return <div>
        <p>Show {props.show.name}</p>
        <p>Visual {props.visual.name}</p>
    </div>;
};

interface WrapperProps {
    showId: string;
    visualId: string;
}

const mapStateToProps = (state: LightBullState, {showId, visualId}: WrapperProps) => ({
    show: selectShow(state, showId),
    visual: selectVisual(state, visualId)
});

export const VisualView = connect(
    mapStateToProps
)(PureVisualView);