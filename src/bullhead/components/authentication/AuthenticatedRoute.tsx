import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {LightBullState} from '../../state';
import {AuthenticationAware} from '../../types/navigation/AuthenticationAware';
import {RouteProps} from 'react-router-dom';

interface Props extends AuthenticationAware, RouteProps {
}

export const PureAuthenticatedRoute = ({component: Component, isAuthenticated, ...rest}: Props) => {
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated && Component) {
                return <Component {...props}/>
            }
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }}/>;
        }}/>
    );

};

const mapStateToProps = (state: LightBullState) => ({
    isAuthenticated: state.authentication.isAuthenticated
});

export const AuthenticatedRoute = connect(
    mapStateToProps
)(PureAuthenticatedRoute);