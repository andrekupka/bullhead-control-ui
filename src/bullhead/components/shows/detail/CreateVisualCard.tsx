import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import {CreateNamedResourceCard} from '../../common/CreateNamedResourceCard';
import {VisualCreationActions} from '../../../state/app/visuals/creation/actions';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {CREATE_VISUAL_LABEL, createVisualRequest} from '../../../state/app/visuals/requests';
import {HttpActions} from '../../../state/app/http/actions';

interface OwnProps {
    showId: string;
}

const mapStateToProps = (state: LightBullState, ownProps: OwnProps) => {
    const newVisualId = state.app.visuals.creation.newVisualId;

    return {
        label: 'Visual Name',

        isPending: selectRequestIsPending(state, CREATE_VISUAL_LABEL),
        successRedirect: (newVisualId ? `/shows/${ownProps.showId}/visuals/${newVisualId}`: undefined),
    }
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, ownProps: OwnProps) => ({
    createResource: (name: string) => dispatch(createVisualRequest(ownProps.showId, name)),
    finishCreation: () => {
        dispatch(HttpActions.reset(CREATE_VISUAL_LABEL));
        dispatch(VisualCreationActions.reset());
    }
});

export const CreateVisualCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNamedResourceCard);
