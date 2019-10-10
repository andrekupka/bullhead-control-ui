import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {ShowsActions} from '../../state/app/shows/actions';
import {connect} from 'react-redux';
import {CreateNamedResourceCard} from '../common/CreateNamedResourceCard';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {HttpActions} from '../../state/app/http/actions';
import {CREATE_SHOW_LABEL, createShowRequest} from '../../state/app/shows/requests';
import React, {useCallback} from 'react';

interface Props {
    dispatch: LightBullThunkDispatch;
    close: () => void;
    isPending: boolean;
    newShowId: string | null;
}

const PureCreateShowCard = ({dispatch, close, isPending, newShowId}: Props) => {
    const reset = useCallback(() => {
        dispatch(HttpActions.reset(CREATE_SHOW_LABEL));
        dispatch(ShowsActions.resetNewShowId());
    }, [dispatch]);

    const createShow = useCallback((name: string) => dispatch(createShowRequest(name)), [dispatch]);

    const successRedirect = newShowId ? `/shows/${newShowId}` : undefined;

    return <CreateNamedResourceCard label='Show Name'
                                    createResource={createShow}
                                    close={close}
                                    reset={reset}
                                    isPending={isPending
                                    } successRedirect={successRedirect}/>;
};


const mapStateToProps = (state: LightBullState) => ({
    label: 'Show Name',
    isPending: selectRequestIsPending(state, CREATE_SHOW_LABEL),
    newShowId: state.app.shows.newShowId
});

export const CreateShowCard = connect(
    mapStateToProps
)(PureCreateShowCard);
