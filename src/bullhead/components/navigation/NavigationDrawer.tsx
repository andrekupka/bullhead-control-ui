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
import {showNavigation} from '../../state/ui/actions';
import {UiActionTypes} from '../../state/ui/types';
import {DRAWER_WIDTH} from '../shared/ui-constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0
    },
    drawerPaper: {
        width: DRAWER_WIDTH
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    }
}));

interface Props {
    isNavigationOpen: boolean;
    closeNavigation: () => void;
}

const PureNavigationDrawer = (props: Props) => {
    const classes = useStyles();

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
    isNavigationOpen: state.ui.isNavigationOpen
});

const mapDispatchToProps = (dispatch: Dispatch<UiActionTypes>) => ({
    closeNavigation: () => dispatch(showNavigation(false))
});

export const NavigationDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureNavigationDrawer);