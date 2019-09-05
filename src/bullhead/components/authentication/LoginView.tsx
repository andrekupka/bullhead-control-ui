import {Button} from '@material-ui/core';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteProps} from 'react-router-dom';
import {LightBullState} from '../../state';
import {setAuthenticated} from '../../state/authentication/actions';
import {AuthenticationActionTypes} from '../../state/authentication/types';
import {AuthenticationAware} from '../../types/navigation/AuthenticationAware';

interface Props extends AuthenticationAware, RouteProps {
    authenticate: () => void;
}

export const PureLoginView = (props: Props) => {

    if (props.isAuthenticated) {
        return <Redirect to='/'/>;
    }
    return (
        <main>
            <div>
                <h1>Login</h1>
                <Button variant='contained' color='primary' onClick={() => props.authenticate()}>Login</Button>
            </div>
        </main>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActionTypes>) => ({
    authenticate: () => dispatch(setAuthenticated(true))
});

export const LoginView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureLoginView);