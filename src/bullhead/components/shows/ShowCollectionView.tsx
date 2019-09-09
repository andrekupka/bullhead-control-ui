import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ShowCollection} from '../../model/Show';
import {LightBullState} from '../../state';
import {loadAllShows} from '../../state/shows/thunks';
import {LightBullThunkDispatch} from '../../types/redux';

interface Props {
    loadShows: () => void;
    isLoading: boolean;
    shows: ShowCollection;
}

export const PureShowCollectionView = (props: Props) => {
    useEffect(() => {
        props.loadShows();
    }, [props.loadShows]);

    return (
        <div>
            {props.isLoading ? <h1>Shows loading</h1> : <h1>Shows</h1>}
            <div>
                {props.shows.map(show =>
                    <Link key={show.id} to={`/shows/${show.id}`}>{show.id} - {show.name}</Link>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    shows: state.shows.collection,
    isLoading: state.shows.isLoading
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    loadShows: () => dispatch(loadAllShows())
});

export const ShowCollectionView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowCollectionView);
