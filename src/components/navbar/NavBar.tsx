import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {ContrastChooserButton} from './ContrastChooserButton';

export const NavBar = () => {
    return (
      <AppBar position='static'>
          <Toolbar>
              <Typography variant='h5' style={{flex: 1}}>
                  Bullhead UI
              </Typography>
              <ContrastChooserButton/>
          </Toolbar>
      </AppBar>
    );
}