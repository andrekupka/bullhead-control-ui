import React, {Dispatch} from 'react';
import {
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {showNavigation} from '../../state/navigation/actions';
import {NavigationActionTypes} from '../../state/navigation/types';

interface Props {
    isNavigationOpen: boolean;
    navigationWidth: number;
    closeNavigation: () => void;
}

const useStyles = makeStyles<Theme,Props>((theme: Theme) => createStyles({
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
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsEthernetIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        System
                    </ListItemText>
                </ListItem>
            </List>
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