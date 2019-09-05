import {createMuiTheme, CssBaseline, MuiThemeProvider} from '@material-ui/core';
import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthenticatedRoute} from './components/authentication/AuthenticatedRoute';
import {LoginView} from './components/authentication/LoginView';
import {LightBullFrame} from './components/LightBullFrame';
import {LightBullState} from './state';

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
                <CssBaseline/>
                <Switch>
                    <Route path='/login' component={LoginView}/>
                    <AuthenticatedRoute path='/' component={LightBullFrame}/>
                </Switch>
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