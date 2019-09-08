import {Avatar, Card, Container, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteProps} from 'react-router-dom';
import {LightBullState} from '../../state';
import {AuthenticationError} from '../../state/authentication/actions';
import {signIn} from '../../state/authentication/thunks';
import {LightBullThunkDispatch} from '../../types/redux';
import {PasswordInput} from '../common/form/PasswordInput';
import {ProgressAwareButton} from '../common/form/ProgressAwareButton';
import {AuthenticationLostInfo} from "./AuthenticationLostInfo";

const MESSAGES = new Map<AuthenticationError, string>();
MESSAGES.set(AuthenticationError.WRONG_PASSWORD, 'Invalid password');
MESSAGES.set(AuthenticationError.TIMEOUT, 'Server took too long to respond');
MESSAGES.set(AuthenticationError.UNKNOWN_ERROR, 'Unknown error');

interface Props extends RouteProps {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    authenticationLost: boolean;
    authenticationError: AuthenticationError | undefined;
    signIn: (password: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    info: {
        paddingBottom: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1)
    },
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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

export const PureLoginView = (props: Props) => {
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
    const errorMessage = props.authenticationError !== undefined ? MESSAGES.get(props.authenticationError) : null;


    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
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
                                   helperText={errorMessage}
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
            </div>
        </Container>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isAuthenticating: state.authentication.isAuthenticating,
    authenticationLost: state.authentication.authenticationLost,
    authenticationError: state.authentication.authenticationError
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    signIn: (password: string) => dispatch(signIn(password))
});

export const SignInView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureLoginView);
