import {createStyles, Fab, Grid, makeStyles, Theme} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {ShowAddModeAction, ShowAddModeActions} from '../../state/ui/shows/add-mode/actions';
import {selectFilteredShows} from '../../state/ui/shows/selectors';
import {AddShowDialog} from './AddShowDialog';
import {ShowCard} from './ShowCard';
import {ShowsFilterToolbar} from './ShowsFilterToolbar';

interface Props {
    shows: ShowCollection;
    openAddShow: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    gridContainer: {
        marginTop: theme.spacing(2)
    },
    gridItem: {
        height: 100
    },
    gridContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export const PureShowCollectionView = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            <ShowsFilterToolbar/>
            <Grid container spacing={3} className={classes.gridContainer}>
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
    shows: selectFilteredShows(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ShowAddModeAction>) => ({
    openAddShow: () => dispatch(ShowAddModeActions.addStart())
});

export const ShowCollectionView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCollectionView);
