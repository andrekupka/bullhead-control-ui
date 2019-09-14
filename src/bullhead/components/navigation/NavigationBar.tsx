import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {NavigationAction, NavigationActions} from '../../state/ui/navigation/actions';
import {NavigationAware} from '../../types/navigation/NavigationAware';
import {SignOutButton} from '../authentication/SignOutButton';
import {NavigationBreadcrumbs} from './NavigationBreadcrumbs';
import {NavigationDrawer} from './NavigationDrawer';
import {ToggleThemeButton} from './ToggleThemeButton';
import {WebSocketConnectionState} from './WebSocketConnectionState';

interface Props extends NavigationAware {
    showNavigation: () => void;
}


const useStyles = makeStyles<Theme, Props>((theme: Theme) => createStyles({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: props => `calc(100% - ${props.navigationWidth}px)`,
        marginLeft: props => props.navigationWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    brand: {
        marginRight: theme.spacing(3)
    },
    hide: {
        display: 'none'
    },
    grow: {
        flexGrow: 1
    }
}));

const PureNavigationBar = (props: Props) => {
    const classes = useStyles(props);

    return (
        <>
            <AppBar position='fixed'
                    color='inherit'
                    className={classNames(classes.appBar, props.isNavigationOpen && classes.appBarShift)}>
                <Toolbar>
                    <IconButton edge='start'
                                color='inherit'
                                className={classNames(props.isNavigationOpen && classes.hide)}
                                onClick={() => props.showNavigation()}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.brand} variant='h6'>
                        LightBull
                    </Typography>
                    <div className={classes.grow}>
                        <NavigationBreadcrumbs/>
                    </div>
                    <WebSocketConnectionState/>
                    <ToggleThemeButton/>
                    <SignOutButton/>
                </Toolbar>
            </AppBar>
            <NavigationDrawer/>
        </>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.ui.navigation,
    isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch<NavigationAction>) => ({
    showNavigation: () => dispatch(NavigationActions.show(true))
});

export const NavigationBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureNavigationBar);
