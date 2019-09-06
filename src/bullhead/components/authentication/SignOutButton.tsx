import {IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../state/authentication/actions';
import {AuthenticationActionTypes} from '../../state/authentication/types';

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