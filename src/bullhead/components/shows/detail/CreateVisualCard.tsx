import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import {CreateNamedResourceCard} from '../../common/CreateNamedResourceCard';
import {VisualActions} from '../../../state/app/visuals/actions';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {CREATE_VISUAL_LABEL, createVisualRequest} from '../../../state/app/visuals/requests';
import {HttpActions} from '../../../state/app/http/actions';
import React, {useCallback} from 'react';
import {selectNewVisualId} from '../../../state/app/visuals/selectors';

interface Props {
    showId: string;

    createVisual: (showId: string, name: string) => void;
    reset: () => void;

    close: () => void;
    isPending: boolean;
    newVisualId: string | null;
}

const PureCreateVisualCard = ({showId, reset, createVisual, close, isPending, newVisualId}: Props) => {
    const createVisualForShow = useCallback((name: string) => createVisual(showId, name),
        [showId, createVisual]);

    const successRedirect = newVisualId ? `/shows/${showId}/visuals/${newVisualId}` : undefined;

    return <CreateNamedResourceCard label='Visual Name'
                                    createResource={createVisualForShow}
                                    close={close}
                                    reset={reset}
                                    isPending={isPending}
                                    successRedirect={successRedirect}/>;
};

const mapStateToProps = (state: LightBullState, {showId}: { showId: string }) => ({
    showId: showId,
    isPending: selectRequestIsPending(state, CREATE_VISUAL_LABEL),
    newVisualId: selectNewVisualId(state)
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createVisual: (showId: string, name: string) => dispatch(createVisualRequest(showId, name)),
    reset: () => {
        dispatch(HttpActions.reset(CREATE_VISUAL_LABEL));
        dispatch(VisualActions.resetNewVisualId());
    }
});

export const CreateVisualCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCreateVisualCard);
