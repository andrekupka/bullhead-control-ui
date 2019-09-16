import {createStyles, Fab, Grid, makeStyles, Theme} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {selectFilteredShows} from '../../state/model/shows/selectors';
import {UiShowAction, UiShowActions} from '../../state/ui/shows/actions';
import {selectShowsAddModeActive} from '../../state/ui/shows/selectors';
import {AddShowDialog} from './AddShowDialog';
import {ShowCard} from './ShowCard';
import {ShowsFilterToolbar} from './ShowsFilterToolbar';

interface Props {
    shows: ShowCollection;
    isAddModeActive: boolean;
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
            {props.isAddModeActive && <AddShowDialog/>}
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isAddModeActive: selectShowsAddModeActive(state),
    shows: selectFilteredShows(state)
});

const mapDispatchToProps = (dispatch: Dispatch<UiShowAction>) => ({
    openAddShow: () => dispatch(UiShowActions.startAdd())
});

export const ShowCollectionView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCollectionView);
