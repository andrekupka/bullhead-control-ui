import React, {useState} from 'react';
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
import {Box, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {CreateVisualCard} from './CreateVisualCard';
import {DeleteShowButton} from './DeleteShowButton';
import {Redirect} from 'react-router-dom';
import {selectShowIsUpdating} from '../../../state/ui/show-details/selectors';

interface Props {
    show?: Show;
    visuals: VisualCollection;
    hasProgress: boolean;
}

const PureShowDetailsView = ({show, visuals, hasProgress}: Props) => {
    const [isCreating, setCreating] = useState(false);

    if (!show) {
        return <Redirect to='/shows'/>;
    }

    const visualCards = visuals.map(visual => ({
        id: visual.id,
        element: <VisualCard showId={show.id}
                             isDisabled={isCreating}
                             visual={visual}/>
    }));

    const addVisual = (
        <Fab color='primary' disabled={hasProgress} onClick={() => setCreating(true)}>
            <AddIcon/>
        </Fab>
    );

    const createVisualCard = <CreateVisualCard showId={show.id} close={() => setCreating(false)}/>;

    const action = isCreating ? createVisualCard : addVisual;

    return (
        <>
            <Box display='flex'>
                <ShowName isDisabled={hasProgress} show={show}/>
                <Box flexGrow={1}/>
                <DeleteShowButton isDisabled={hasProgress} showId={show.id}/>
            </Box>
            <ShowDetailsFilterToolbar/>
            <CardGrid cards={visualCards} action={action}/>
        </>
    );
};

interface WrapperProps {
    showId: string;
}

const mapStateToProps = (state: LightBullState, {showId}: WrapperProps) => ({
    show: selectShow(state, showId),
    visuals: selectFilteredVisualsOfShow(state, showId),
    hasProgress: selectShowIsUpdating(state, showId)
});

export const ShowDetailsView = connect(
    mapStateToProps
)(PureShowDetailsView);