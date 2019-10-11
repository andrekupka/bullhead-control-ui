import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {ShowsActions} from '../../state/app/shows/actions';
import {connect} from 'react-redux';
import {CreateNamedResourceCard} from '../common/CreateNamedResourceCard';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {HttpActions} from '../../state/app/http/actions';
import {CREATE_SHOW_LABEL, createShowRequest} from '../../state/app/shows/requests';
import React from 'react';
import {selectNewShowId} from '../../state/app/shows/selectors';

interface Props {
    createShow: (name: string) => void;
    reset: () => void;

    close: () => void;
    isPending: boolean;
    newShowId: string | null;
}

const PureCreateShowCard = ({createShow, reset, close, isPending, newShowId}: Props) => {
    const successRedirect = newShowId ? `/shows/${newShowId}` : undefined;

    return <CreateNamedResourceCard label='Show Name'
                                    createResource={createShow}
                                    close={close}
                                    reset={reset}
                                    isPending={isPending}
                                    successRedirect={successRedirect}/>;
};


const mapStateToProps = (state: LightBullState) => ({
    label: 'Show Name',
    isPending: selectRequestIsPending(state, CREATE_SHOW_LABEL),
    newShowId: selectNewShowId(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createShow: (name: string) => dispatch(createShowRequest(name)),
    reset: () => {
        dispatch(HttpActions.reset(CREATE_SHOW_LABEL));
        dispatch(ShowsActions.resetNewShowId());
    }
});

export const CreateShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCreateShowCard);
