import React from 'react';
import {IconButton} from '@material-ui/core';
import {InvertColors} from '@material-ui/icons';

export const ContrastChooserButton = () => {
  return (
      <IconButton color='inherit'>
          <InvertColors/>
      </IconButton>
  );
};