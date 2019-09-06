import {IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {AuthenticationActionTypes, signOut} from '../../state/authentication/actions';

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

const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActionTypes>) => ({
    signOut: () => dispatch(signOut())
});

export const SignOutButton = connect(
    null,
    mapDispatchToProps
)(PureLogoutButton);