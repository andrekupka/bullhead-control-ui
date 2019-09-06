import {IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../state/authentication/thunks';
import {LightBullThunkDispatch} from '../../types/redux';

interface Props {
    signOut: () => void;
}

const PureLogoutButton = (props: Props) => {
    return (
        <IconButton color='inherit' onClick={() => props.signOut()}>
            <ExitToAppIcon/>
        </IconButton>
    );
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    signOut: () => dispatch(signOut())
});

export const SignOutButton = connect(
    null,
    mapDispatchToProps
)(PureLogoutButton);