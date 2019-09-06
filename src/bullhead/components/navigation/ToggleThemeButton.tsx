import {IconButton} from '@material-ui/core';
import {InvertColors} from '@material-ui/icons';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {ThemeActionTypes, toggleTheme} from '../../state/theme/actions';

interface Props {
    toggleTheme: () => void;
}

const PureToggleThemeButton = (props: Props) => {
    return (
        <IconButton color='inherit' onClick={() => props.toggleTheme()}>
            <InvertColors/>
        </IconButton>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<ThemeActionTypes>) => ({
    toggleTheme: () => dispatch(toggleTheme())
});

export const ToggleThemeButton = connect(
    null,
    mapDispatchToProps
)(PureToggleThemeButton);