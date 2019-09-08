import React, {useEffect, useState} from "react";
import {ShowCollection} from "../../model/Show";
import {Api} from "../../api/client";
import {LightBullState} from "../../state";
import {connect} from "react-redux";
import {LightBullThunkDispatch} from "../../types/redux";
import {loadAllShows} from "../../state/shows/thunks";

interface Props {
    loadShows: () => void;
    isLoading: boolean;
    shows: ShowCollection;
}

export const PureShowView = (props: Props) => {
    useEffect(() => {
        props.loadShows()
    }, [props.loadShows]);

    return (
        <div>
            {props.isLoading ? <h1>Shows loading</h1> : <h1>Shows</h1>}
            <div>
                {props.shows.map(show => <p key={show.id}>{show.id} - {show.name}</p>)}
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

export const ShowView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowView);
