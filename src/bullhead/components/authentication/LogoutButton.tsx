import React, {Dispatch} from 'react';
import {IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {connect} from 'react-redux';
import {setAuthenticated} from '../../state/authentication/actions';
import {AuthenticationActionTypes} from '../../state/authentication/types';

interface Props {
    logout: () => void;
}

const PureLogoutButton = (props: Props) => {
    return (
        <IconButton color='inherit' onClick={() => props.logout()}>
            <ExitToAppIcon/>
        </IconButton>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActionTypes>) => ({
    logout: () => dispatch(setAuthenticated(false))
});

export const LogoutButton = connect(
    null,
    mapDispatchToProps
)(PureLogoutButton);