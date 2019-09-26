import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {createShow} from '../../state/app/shows/thunks';
import {ShowCreationActions} from '../../state/app/shows/creation/actions';
import {connect} from 'react-redux';
import {CreateNamedResourceCard} from '../common/CreateNamedResourceCard';

const mapStateToProps = (state: LightBullState) => {
    const creation = state.app.shows.creation;
    const newShowId = creation.newShowId;

    return {
        label: 'Show Name',

        isPending: creation.isPending,
        successRedirect: (newShowId ? `/shows/${newShowId}`: undefined),
        error: creation.error
    }
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createResource: (name: string) => dispatch(createShow(name)),
    finishCreation: () => dispatch(ShowCreationActions.reset())
});

export const CreateShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNamedResourceCard);
