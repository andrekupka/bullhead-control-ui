import {Grid} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {ShowCard} from './ShowCard';

interface Props {
    shows: ShowCollection;
}

export const PureShowCollectionView = (props: Props) => {
    return (
        <div>
            <h1>Shows</h1>
            <Grid container spacing={3}>
                {props.shows.map(show =>
                    <Grid item xs={4} key={show.id}>
                        <ShowCard show={show}/>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    shows: state.shows.collection
});

export const ShowCollectionView = connect(
    mapStateToProps
)(PureShowCollectionView);
