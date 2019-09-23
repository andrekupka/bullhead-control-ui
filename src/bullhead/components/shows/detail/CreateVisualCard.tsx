import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {LightBullThunkDispatch} from '../../../types/redux';
import {CreateNamedResourceCard} from '../../common/CreateNamedResourceCard';
import {createVisual} from '../../../state/app/visuals/thunks';
import {VisualCreationActions} from '../../../state/app/visuals/creation/actions';

interface OwnProps {
    showId: string;
}

const mapStateToProps = (state: LightBullState, ownProps: OwnProps) => {
    const creation = state.app.visuals.creation;
    const newVisualId = creation.newVisualId;

    return {
        label: 'Visual Name',

        isPending: creation.isPending,
        successRedirect: (newVisualId ? `/shows/${ownProps.showId}/visuals/${newVisualId}`: undefined),
        error: creation.error
    }
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch, ownProps: OwnProps) => ({
    createResource: (name: string) => dispatch(createVisual(ownProps.showId, name)),
    finishCreation: () => dispatch(VisualCreationActions.reset())
});

export const CreateVisualCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNamedResourceCard);
