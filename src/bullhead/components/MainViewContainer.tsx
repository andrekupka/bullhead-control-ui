import {createStyles, makeStyles, Theme} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../state';
import {DRAWER_WIDTH} from './shared/ui-constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -DRAWER_WIDTH,
        padding: theme.spacing(3)
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    shiftToolbar: {
        paddingTop: theme.mixins.toolbar.minHeight,
    }
}));

interface Props {
    isNavigationOpen: boolean;
}

const PureMainViewContainer = (props: Props) => {
    const classes = useStyles();

    const mainClasses = classNames(
        classes.shiftToolbar,
        classes.content,
        props.isNavigationOpen && classes.contentShift
    );

    return (
        <main className={mainClasses}>
            <h1>Welcome at LightBull</h1>
        </main>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    isNavigationOpen: state.ui.isNavigationOpen
});

export const MainViewContainer = connect(
    mapStateToProps
)(PureMainViewContainer);
