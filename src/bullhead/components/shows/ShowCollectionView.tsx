import {Box, createStyles, Fab, Grid, makeStyles, Theme} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {ShowUpdatingState} from '../../state/app/shows/updating/reducer';
import {selectFilteredShows} from '../../state/model/shows/selectors';
import {CreateShowDialog} from './CreateShowDialog';
import {ShowCard} from './ShowCard';
import {ShowsFilterToolbar} from './ShowsFilterToolbar';

interface Props {
    shows: ShowCollection;
    isUpdating: ShowUpdatingState,
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

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    return (
        <div>
            <ShowsFilterToolbar/>
            <Grid container spacing={3} className={classes.gridContainer}>
                {props.shows.map(show =>
                    <Grid item xs={4} key={show.id} className={classes.gridItem}>
                        <ShowCard show={show} isUpdating={props.isUpdating[show.id] || false}/>
                    </Grid>
                )}
                <Grid item xs={4} className={classes.gridItem}>
                    <Box display='flex' flexDirection='column' justifyContent='center' height='100%'>
                        <Fab color='primary' onClick={() => setCreateDialogOpen(true)}>
                            <AddIcon/>
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
            {createDialogOpen && <CreateShowDialog close={() => setCreateDialogOpen(false)}/>}
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isUpdating: state.app.shows.updating,
    shows: selectFilteredShows(state)
});

export const ShowCollectionView = connect(
    mapStateToProps,
)(PureShowCollectionView);
