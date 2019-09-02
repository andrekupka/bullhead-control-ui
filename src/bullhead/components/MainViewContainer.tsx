import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {Router} from '@reach/router';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {NavigationAware} from '../types/navigation/NavigationAware';
import {Home} from './home/Home';
import {Route} from './Route';
import {SystemView} from './system/SystemView';

interface Props extends NavigationAware {
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: props => props.isNavigationOpen ? 0 : -240,
        padding: theme.spacing(3)
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    shiftToolbar: {
        paddingTop: theme.mixins.toolbar.minHeight
    }
}));

const PureMainViewContainer = (props: Props) => {
    console.log(props);
    const classes = useStyles(props);

    const mainClasses = classNames(
        classes.shiftToolbar,
        classes.content,
        props.isNavigationOpen && classes.contentShift
    );

    return (
        <main className={mainClasses}>
            <Router>
                <Route component={Home} path='/'/>
                <Route component={SystemView} path='/system'/>
            </Router>
        </main>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.navigation
});

export const MainViewContainer = connect(
    mapStateToProps
)(PureMainViewContainer);
