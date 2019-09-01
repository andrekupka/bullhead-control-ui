import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {showNavigation} from '../../state/navigation/actions';
import {NavigationActionTypes} from '../../state/navigation/types';
import {NavigationAware} from '../../types/navigation/NavigationAware';
import {NavigationDrawer} from './NavigationDrawer';
import {ToggleThemeButton} from './ToggleThemeButton';

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
    hide: {
        display: 'none'
    }
}));

const PureNavigationBar = (props: Props) => {
    const classes = useStyles(props);

    return (
        <>
            <AppBar position='fixed'
                    color='inherit'
                    className={classNames(classes.appBar, props.isNavigationOpen && classes.appBarShift)}
            >
                <Toolbar>
                    <IconButton edge='start'
                                color='inherit'
                                className={classNames(props.isNavigationOpen && classes.hide)}
                                onClick={() => props.showNavigation()}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' style={{flex: 1}}>
                        LightBull
                    </Typography>
                    <ToggleThemeButton/>
                </Toolbar>
            </AppBar>
            <NavigationDrawer/>
        </>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.navigation
});

const mapDispatchToProps = (dispatch: Dispatch<NavigationActionTypes>) => ({
    showNavigation: () => dispatch(showNavigation(true))
});

export const NavigationBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureNavigationBar);