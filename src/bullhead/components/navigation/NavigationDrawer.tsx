import React from 'react';
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
import {DRAWER_WIDTH} from '../shared/ui-constants';

interface Props {
    isOpen: boolean;
    close: () => void;
}


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

export const NavigationDrawer = (props: Props) => {
    const classes = useStyles();

    return (
        <Drawer variant="persistent"
                anchor="left"
                open={props.isOpen}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => props.close()}>
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