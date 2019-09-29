import {Show} from '../../model/Show';
import {Visual} from '../../model/Visual';
import {LightBullState} from '../../state';
import {selectShow} from '../../state/model/shows/selectors';
import {selectVisual} from '../../state/model/visuals/selectors';
import {connect} from 'react-redux';
import React from 'react';
import {VisualName} from './VisualName';

interface Props {
    show: Show;
    visual: Visual;
}

const PureVisualView = ({show, visual}: Props) => {
    return <>
        <VisualName visual={visual}/>
        <p>Show {show.name}</p>
        <p>Visual {visual.name}</p>
    </>;
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