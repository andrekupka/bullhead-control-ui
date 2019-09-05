import {Avatar, Button, Container, createStyles, makeStyles, TextField, Theme, Typography} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, {Dispatch, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, RouteProps} from 'react-router-dom';
import {LightBullState} from '../../state';
import {signIn} from '../../state/authentication/actions';
import {AuthenticationActionTypes} from '../../state/authentication/types';
import {AuthenticationAware} from '../../types/navigation/AuthenticationAware';
import {PasswordInput} from '../common/form/PasswordInput';

interface Props extends AuthenticationAware, RouteProps {
    wrongPassword: boolean;
    signIn: (password: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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

export const PureLoginView = (props: Props) => {
    const [password, setPassword] = useState('');

    const classes = useStyles();

    if (props.isAuthenticated) {
        return <Redirect to='/'/>;
    }

    const signIn = (event: React.FormEvent) => {
        event.preventDefault();
        props.signIn(password);
    };

    const errorMessage = props.wrongPassword ? 'Invalid password' : null;

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.paper}>
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
                                   error={props.wrongPassword}
                                   helperText={errorMessage}
                                   required
                                   fullWidth
                                   autoFocus
                                   value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                    <Button className={classes.submit}
                            variant='contained'
                            color='primary'
                            type='submit'
                            fullWidth>
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    wrongPassword: state.authentication.wrongPassword,
    isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch<AuthenticationActionTypes>) => ({
    signIn: (password: string) => dispatch(signIn(password))
});

export const SignInView = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureLoginView);