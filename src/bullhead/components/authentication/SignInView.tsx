import {Avatar, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteProps} from 'react-router-dom';
import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {PasswordInput} from '../common/form/PasswordInput';
import {ProgressAwareButton} from '../common/form/ProgressAwareButton';
import {StandaloneContainer} from '../common/StandaloneContainer';
import {AuthenticationLostInfo} from './AuthenticationLostInfo';
import {loginRequest, LOGIN_LABEL} from '../../state/authentication/requests';
import {selectRequestIsPending} from '../../state/app/http/selectors';

interface Props extends RouteProps {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    authenticationLost: boolean;
    authenticationError?: string;
    signIn: (password: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    info: {
        paddingBottom: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(3, 0)
    }
}));

const getDestination = (props: Props) => {
    if (props.location && props.location.state) {
        return props.location.state.from || '/';
    }
    return '/';
};

const PureLoginView = (props: Props) => {
    const [password, setPassword] = useState('');

    const classes = useStyles();

    if (props.isAuthenticated) {
        return <Redirect to={getDestination(props)}/>;
    }

    const signIn = (event: React.FormEvent) => {
        event.preventDefault();
        props.signIn(password);
    };

    const hasError = props.authenticationError !== undefined;

    return (
        <StandaloneContainer>
            {props.authenticationLost && <AuthenticationLostInfo/>}
            <Avatar className={classes.avatar}>
                <LockIcon/>
            </Avatar>
            <Typography component='h1' variant='h5'>
                Sign In
            </Typography>
            <form className={classes.form} noValidate onSubmit={event => signIn(event)}>
                <PasswordInput id='password'
                               label='Password'
                               variant='outlined'
                               error={hasError}
                               helperText={props.authenticationError}
                               disabled={props.isAuthenticating}
                               required
                               fullWidth
                               autoFocus
                               value={password}
                               onChange={event => setPassword(event.target.value)}/>
                <ProgressAwareButton className={classes.submit}
                                     variant='contained'
                                     color='primary'
                                     type='submit'
                                     disabled={password.length === 0}
                                     hasProgress={props.isAuthenticating}
                                     fullWidth>
                    Sign In
                </ProgressAwareButton>
            </form>
        </StandaloneContainer>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isAuthenticating: selectRequestIsPending(state, LOGIN_LABEL),
    authenticationLost: state.authentication.authenticationLost,
    authenticationError: state.authentication.authenticationError
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    signIn: (password: string) => dispatch(loginRequest(password))
});

export const SignInView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureLoginView);
