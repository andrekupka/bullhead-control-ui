import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ShowWithVisualIds} from '../../../model/Show';
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
import {selectShowHasProgress} from '../../../state/app/shows/selectors';

interface Props {
    show?: ShowWithVisualIds;
    visuals: VisualCollection;
    hasProgress: boolean;
}

const PureShowDetailsView = ({show, visuals, hasProgress}: Props) => {
    const [isCreating, setCreating] = useState(false);

    if (!show) {
        return <Redirect push to='/shows'/>;
    }

    const disableChildren = hasProgress || isCreating;

    const visualCards = visuals.map(visual => ({
        id: visual.id,
        element: <VisualCard showId={show.id}
                             isDisabled={isCreating}
                             visual={visual}/>
    }));

    const action = isCreating ?
        <CreateVisualCard showId={show.id} close={() => setCreating(false)}/> :
        <Fab color='primary' disabled={disableChildren} onClick={() => setCreating(true)}>
            <AddIcon/>
        </Fab>;

    return (
        <>
            <Box display='flex'>
                <ShowName isDisabled={disableChildren} show={show}/>
                <Box flexGrow={1}/>
                <DeleteShowButton isDisabled={disableChildren} showId={show.id}/>
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
    hasProgress: selectShowHasProgress(state, showId)
});

export const ShowDetailsView = connect(
    mapStateToProps
)(PureShowDetailsView);