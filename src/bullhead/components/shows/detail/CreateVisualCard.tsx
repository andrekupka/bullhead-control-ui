import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import {CreateNamedResourceCard} from '../../common/CreateNamedResourceCard';
import {VisualActions} from '../../../state/app/visuals/actions';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {CREATE_VISUAL_LABEL, createVisualRequest} from '../../../state/app/visuals/requests';
import {HttpActions} from '../../../state/app/http/actions';
import React, {useCallback} from 'react';

interface Props {
    showId: string;
    dispatch: LightBullThunkDispatch;
    close: () => void;
    isPending: boolean;
    newVisualId: string | null;
}

const PureCreateVisualCard = ({showId, dispatch, close, isPending, newVisualId}: Props) => {
    const reset = useCallback(() => {
        dispatch(HttpActions.reset(CREATE_VISUAL_LABEL));
        dispatch(VisualActions.resetNewVisualId());
    }, [dispatch]);

    const createVisual = useCallback((name: string) => dispatch(createVisualRequest(showId, name)), [showId, dispatch]);

    const successRedirect = newVisualId ? `/shows/${showId}/visuals/${newVisualId}` : undefined;

    return <CreateNamedResourceCard label='Visual Name'
                                    createResource={createVisual}
                                    close={close}
                                    reset={reset}
                                    isPending={isPending}
                                    successRedirect={successRedirect}/>;
};

const mapStateToProps = (state: LightBullState, {showId}: { showId: string }) => ({
    showId: showId,
    isPending: selectRequestIsPending(state, CREATE_VISUAL_LABEL),
    newVisualId: state.app.visuals.newVisualId
});

export const CreateVisualCard = connect(
    mapStateToProps
)(PureCreateVisualCard);
