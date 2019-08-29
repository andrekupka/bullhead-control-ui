import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {ThemeToggleButton} from './ThemeToggleButton';

export const NavBar = () => {
    return (
      <AppBar position='static' color='inherit'>
          <Toolbar>
              <Typography variant='h5' style={{flex: 1}}>
                  Bullhead UI
              </Typography>
              <ThemeToggleButton/>
          </Toolbar>
      </AppBar>
    );
};