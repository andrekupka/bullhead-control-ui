import {AppBar, ClickAwayListener, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState} from 'react';
import {NavigationMenu} from './NavigationMenu';
import {ToggleThemeButton} from './ToggleThemeButton';

export const NavigationBar = () => {
    const [showNavigation, setShowNavigation] = useState(false);

    const toggleShowNavigation = () => setShowNavigation(!showNavigation);

    return (
        <>
            <AppBar position='fixed' color='inherit'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' onClick={() => toggleShowNavigation()}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' style={{flex: 1}}>
                        Bullhead UI
                    </Typography>
                    <ToggleThemeButton/>
                </Toolbar>
            </AppBar>
            <NavigationMenu isOpen={showNavigation}/>
        </>
    );
};