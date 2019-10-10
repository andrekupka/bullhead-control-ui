import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {selectFilteredShows} from '../../state/model/shows/selectors';
import {CardGrid} from '../common/card-grid/CardGrid';
import {ShowCard} from './ShowCard';
import {ShowFilterToolbar} from './ShowFilterToolbar';
import {CreateShowCard} from './CreateShowCard';

interface Props {
    shows: ShowCollection;
}

const PureShowsView = (props: Props) => {
    const [isCreating, setCreating] = useState(false);

    const showCards = props.shows.map(show => ({
        id: show.id,
        element: <ShowCard isDisabled={isCreating} show={show}/>
    }));

    const action = isCreating ?
        <CreateShowCard close={() => setCreating(false)}/> :
        <Fab color='primary' onClick={() => setCreating(true)}>
            <AddIcon/>
        </Fab>;

    return (
        <>
            <ShowFilterToolbar/>
            <CardGrid cards={showCards} action={action}/>
        </>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    shows: selectFilteredShows(state)
});

export const ShowsView = connect(
    mapStateToProps
)(PureShowsView);
