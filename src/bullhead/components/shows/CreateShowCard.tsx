import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {ShowsActions} from '../../state/app/shows/actions';
import {connect} from 'react-redux';
import {CreateNamedResourceCard} from '../common/CreateNamedResourceCard';
import {selectRequestIsPending} from '../../state/app/http/selectors';
import {HttpActions} from '../../state/app/http/actions';
import {CREATE_SHOW_LABEL, createShowRequest} from '../../state/app/shows/requests';

const mapStateToProps = (state: LightBullState) => {
    const newShowId = state.app.shows.newShowId;

    return {
        label: 'Show Name',

        isPending: selectRequestIsPending(state, CREATE_SHOW_LABEL),
        successRedirect: (newShowId ? `/shows/${newShowId}`: undefined),
    };
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createResource: (name: string) => dispatch(createShowRequest(name)),
    reset: () => {
        dispatch(HttpActions.reset(CREATE_SHOW_LABEL));
        dispatch(ShowsActions.resetNewShowId());
    }
});

export const CreateShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNamedResourceCard);
