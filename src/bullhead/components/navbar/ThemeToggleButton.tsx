import React, {Dispatch} from 'react';
import {IconButton} from '@material-ui/core';
import {InvertColors} from '@material-ui/icons';
import {ThemeActionTypes, toggleTheme, ToggleThemeAction} from '../../state/theme/actions';
import {connect} from 'react-redux';

interface Props {
    onToggleTheme: () => void;
}

const PureThemeToggleButton = (props: Props) => {
  return (
      <IconButton color='inherit' onClick={() => props.onToggleTheme()}>
          <InvertColors/>
      </IconButton>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ToggleThemeAction>) => {
    return {
        onToggleTheme: () => dispatch(toggleTheme())
    };
};

export const ThemeToggleButton = connect(
    null,
    mapDispatchToProps,
)(PureThemeToggleButton);