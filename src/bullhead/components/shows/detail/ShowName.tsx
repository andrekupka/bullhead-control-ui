import React from 'react';
import {connect} from 'react-redux';
import {Show} from '../../../model/Show';
import {LightBullState} from '../../../state';
import {selectIsShowUpdating} from '../../../state/app/shows/selectors';
import {updateShow} from '../../../state/app/shows/thunks';
import {LightBullThunkDispatch} from '../../../types/redux';
import {EditableName} from '../../common/EditableName';

interface Props {
    show: Show;
    isUpdating: boolean;
    updateShow: (show: Show) => void;
}

export const PureShowName = ({show, isUpdating, updateShow}: Props) => {
    const performUpdate = (name: string) => {
        const newShow = {
            ...show,
            name: name
        };
        updateShow(newShow);
    };

    return <EditableName name={show.name}
                         updateName={name => performUpdate(name)}
                         isUpdating={isUpdating}/>;
};

type OwnProps = Pick<Props, 'show'>

const mapStateToProps = (state: LightBullState, {show}: OwnProps) => ({
    isUpdating: selectIsShowUpdating(state, show.id),
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    updateShow: (show: Show) => dispatch(updateShow(show))
});

export const ShowName = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowName);