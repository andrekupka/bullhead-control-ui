import React, {useMemo} from 'react';
import {createMuiTheme, CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {NavigationBar} from './components/navigation/NavigationBar';
import {BullheadState} from './state';
import {connect} from 'react-redux';

interface Props {
    isDark: boolean;
}

const PureBullhead = (props: Props) => {
    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: props.isDark ? 'dark' : 'light'
        }
    }), [props.isDark]);

    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <CssBaseline/>
                <div>
                    <NavigationBar/>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

const mapStateToProps = (state: BullheadState) => ({
    isDark: state.theme.isDark
});


export const Bullhead = connect(
    mapStateToProps
)(PureBullhead);