import React, {useMemo} from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {BrowserRouter} from 'react-router-dom';
import {MainViewContainer} from './components/MainViewContainer';
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
            <BrowserRouter>
                <div style={{display: 'flex'}}>
                    <CssBaseline/>
                    <NavigationBar/>
                    <MainViewContainer/>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isDark: state.theme.isDark
});

export const LightBull = connect(
    mapStateToProps
)(PureLightBull);