import {createStyles, Divider, Drawer, IconButton, makeStyles, Theme} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {NavigationActionTypes, showNavigation} from '../../state/navigation/actions';
import {NavigationAware} from '../../types/navigation/NavigationAware';
import {NavigationList} from './NavigationList';

interface Props extends NavigationAware {
    closeNavigation: () => void;
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) => createStyles({
    drawer: {
        width: props => props.navigationWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: props => props.navigationWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

const PureNavigationDrawer = (props: Props) => {
    const classes = useStyles(props);

    return (
        <Drawer variant="persistent"
                anchor="left"
                open={props.isNavigationOpen}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => props.closeNavigation()}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <NavigationList/>
        </Drawer>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.navigation
});

const mapDispatchToProps = (dispatch: Dispatch<NavigationActionTypes>) => ({
    closeNavigation: () => dispatch(showNavigation(false))
});

export const NavigationDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureNavigationDrawer);