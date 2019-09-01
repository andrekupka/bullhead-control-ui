import React, {useMemo} from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {NavigationBar} from './components/navigation/NavigationBar';
import {LightBullState} from './state';
import {connect} from 'react-redux';

interface Props {
    isDark: boolean;
}

const PureLightBull = (props: Props) => {
    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: props.isDark ? 'dark' : 'light'
        }
    }), [props.isDark]);

    return (
        <MuiThemeProvider theme={theme}>
            <div style={{display: 'flex'}}>
                <CssBaseline/>
                <NavigationBar/>
            </div>
        </MuiThemeProvider>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isDark: state.theme.isDark
});


export const LightBull = connect(
    mapStateToProps
)(PureLightBull);