import {Show} from '../../model/Show';
import {Visual} from '../../model/Visual';
import {LightBullState} from '../../state';
import {selectShow} from '../../state/model/shows/selectors';
import {selectVisual} from '../../state/model/visuals/selectors';
import {connect} from 'react-redux';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {VisualName} from './VisualName';
import {selectVisualHasProgress} from '../../state/app/visuals/selectors';
import {Box} from '@material-ui/core';
import {DeleteVisualButton} from './DeleteVisualButton';

interface Props {
    show: Show;
    visual: Visual;
    hasProgress: boolean;
}

const PureVisualView = ({show, visual, hasProgress}: Props) => {
    if (!visual) {
        return <Redirect to={`/shows/${show.id}`}/>;
    }

    return <>
        <Box display='flex'>
            <VisualName isDisabled={hasProgress} visual={visual}/>
            <Box flexGrow={1}/>
            <DeleteVisualButton isDisabled={hasProgress} showId={visual.showId} visualId={visual.id}/>
        </Box>
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
    visual: selectVisual(state, visualId),
    hasProgress: selectVisualHasProgress(state, visualId)
});

export const VisualView = connect(
    mapStateToProps
)(PureVisualView);