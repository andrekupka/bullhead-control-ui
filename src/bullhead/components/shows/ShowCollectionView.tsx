import {Fab, Grid, makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {UiShowsAction, UiShowsActions} from '../../state/ui/shows/actions';
import {AddShowDialog} from './AddShowDialog';
import {ShowCard} from './ShowCard';

interface Props {
    shows: ShowCollection;
    openAddShow: () => void;
}

const useStyles = makeStyles({
    gridItem: {
        height: 100
    },
    gridContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const PureShowCollectionView = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            <h1>Shows</h1>
            <Grid container spacing={3}>
                {props.shows.map(show =>
                    <Grid item xs={4} key={show.id} className={classes.gridItem}>
                        <ShowCard show={show}/>
                    </Grid>
                )}
                <Grid item xs={4} className={classes.gridItem}>
                    <Fab color='primary' className={classes.gridContent} onClick={() => props.openAddShow()}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <AddShowDialog/>
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    shows: Object.keys(state.model.shows).map(showId => state.model.shows[showId])
});

const mapDispatchToProps = (dispatch: Dispatch<UiShowsAction>) => ({
    openAddShow: () => dispatch(UiShowsActions.addStart())
});

export const ShowCollectionView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCollectionView);
