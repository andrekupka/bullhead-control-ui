import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React, {Dispatch, useState} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {showNavigationDrawer} from '../../state/ui/actions';
import {UiActionTypes} from '../../state/ui/types';
import {DRAWER_WIDTH} from '../shared/ui-constants';
import {NavigationDrawer} from './NavigationDrawer';
import {ToggleThemeButton} from './ToggleThemeButton';

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    hide: {
        display: 'none'
    }
}));

interface Props {
    isNavigationOpen: boolean;
    showNavigation: () => void;
}

const PureNavigationBar = (props: Props) => {
    const classes = useStyles();

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
    isNavigationOpen: state.ui.isNavigationOpen
});

const mapDispatchToProps = (dispatch: Dispatch<UiActionTypes>) => ({
    showNavigation: () => dispatch(showNavigationDrawer(true))
});

export const NavigationBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureNavigationBar);