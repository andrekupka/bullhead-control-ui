import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {selectFilteredShows} from '../../state/model/shows/selectors';
import {CardGrid} from '../common/card-grid/CardGrid';
import {CreateShowDialog} from './CreateShowDialog';
import {ShowCard} from './ShowCard';
import {ShowsFilterToolbar} from './ShowsFilterToolbar';

interface Props {
    shows: ShowCollection;
}

export const PureShowCollectionView = (props: Props) => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const showCards = props.shows.map(show => ({
        id: show.id,
        element: <ShowCard show={show}/>
    }));

    const addShow = (
        <Fab color='primary' onClick={() => setCreateDialogOpen(true)}>
            <AddIcon/>
        </Fab>
    );

    return (
        <div>
            <ShowsFilterToolbar/>
            <CardGrid cards={showCards} action={addShow}/>
            {createDialogOpen && <CreateShowDialog close={() => setCreateDialogOpen(false)}/>}
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    shows: selectFilteredShows(state)
});

export const ShowCollectionView = connect(
    mapStateToProps
)(PureShowCollectionView);
