import {IconButton} from '@material-ui/core';
import {InvertColors} from '@material-ui/icons';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {toggleTheme} from '../../state/theme/actions';
import {ThemeActionTypes} from '../../state/theme/types';

interface Props {
    onToggleTheme: () => void;
}

const PureToggleThemeButton = (props: Props) => {
    return (
        <IconButton color='inherit' onClick={() => props.onToggleTheme()}>
            <InvertColors/>
        </IconButton>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<ThemeActionTypes>) => {
    return {
        onToggleTheme: () => dispatch(toggleTheme())
    };
};

export const ToggleThemeButton = connect(
    null,
    mapDispatchToProps
)(PureToggleThemeButton);