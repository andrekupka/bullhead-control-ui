import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React, {useState} from 'react';
import {DRAWER_WIDTH} from '../shared/ui-constants';
import {NavigationDrawer} from './NavigationDrawer';
import {ToggleThemeButton} from './ToggleThemeButton';

const drawerWidth = 240;

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

export const NavigationBar = () => {
    const [showNavigation, setShowNavigation] = useState(false);
    const classes = useStyles();

    return (
        <>
            <AppBar position='fixed'
                    color='inherit'
                    className={classNames(classes.appBar, showNavigation && classes.appBarShift)}
            >
                <Toolbar>
                    <IconButton edge='start'
                                color='inherit'
                                className={classNames(showNavigation && classes.hide)}
                                onClick={() => setShowNavigation(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' style={{flex: 1}}>
                        LightBull
                    </Typography>
                    <ToggleThemeButton/>
                </Toolbar>
            </AppBar>
            <NavigationDrawer isOpen={showNavigation} close={() => setShowNavigation(false)}/>
        </>
    );
};