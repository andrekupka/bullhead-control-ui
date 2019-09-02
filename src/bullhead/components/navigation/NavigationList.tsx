import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';

interface NavigationListItemProps {
    to: string;
    exact?: boolean;
    text: string;
    icon: React.ComponentType
}

const NavigationListItem: FunctionComponent<NavigationListItemProps> = ({to, text, icon: Icon, exact = false}) => {
    // TODO ListItem selected property should be used
    const activeStyle = {
        background: 'rgba(255, 255, 255, 0.2)'
    };

    return (
        <ListItem button component={NavLink} to={to} activeStyle={activeStyle} exact={exact}>
            <ListItemIcon>
                <Icon/>
            </ListItemIcon>
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    );
};

export const NavigationList = () => {
    return (
        <List>
            <NavigationListItem to='/' exact={true} text='Home' icon={HomeIcon}/>
            <NavigationListItem to='/system' text='System' icon={SettingsIcon}/>
        </List>
    );
};