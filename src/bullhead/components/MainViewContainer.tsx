import {createStyles, makeStyles, Theme} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {NavigationAware} from '../types/navigation/NavigationAware';
import {AuthenticatedRoute} from './authentication/AuthenticatedRoute';
import {LoginView} from './authentication/LoginView';
import {NotFound} from './common/NotFound';
import {Home} from './home/Home';
import {SystemView} from './system/SystemView';
import {Route, Switch} from 'react-router-dom';

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
        })
    },
    contentView: {
        width: '100%',
        paddingTop: theme.mixins.toolbar.minHeight
    }
}));

const PureMainViewContainer = (props: Props) => {
    const classes = useStyles(props);

    const mainClasses = classNames(
        classes.content,
        props.isNavigationOpen && classes.contentShift
    );

    return (
        <main className={mainClasses}>
            <div className={classes.contentView}>
                <Switch>
                    <Route path='/login' component={LoginView}/>
                    <AuthenticatedRoute exact path='/' component={Home}/>
                    <AuthenticatedRoute path='/system' component={SystemView}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </main>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.navigation
});

export const MainViewContainer = connect(
    mapStateToProps
)(PureMainViewContainer);
