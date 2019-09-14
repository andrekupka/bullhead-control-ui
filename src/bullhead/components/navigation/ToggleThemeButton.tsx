import {IconButton} from '@material-ui/core';
import {InvertColors} from '@material-ui/icons';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {ThemeAction, ThemeActions} from '../../state/ui/theme/actions';

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

const mapDispatchToProps = (dispatch: Dispatch<ThemeAction>) => ({
    toggleTheme: () => dispatch(ThemeActions.toggle())
});

export const ToggleThemeButton = connect(
    null,
    mapDispatchToProps
)(PureToggleThemeButton);