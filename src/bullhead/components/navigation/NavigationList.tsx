import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {FunctionComponent} from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';

interface NavigationListItemProps {
    to: string;
    exact?: boolean;
    text: string;
    icon: JSX.Element
}

const NavigationListItem: FunctionComponent<NavigationListItemProps> = ({to, text, icon, exact = false}) => {
    // TODO ListItem selected property should be used
    const activeStyle = {
        background: 'rgba(255, 255, 255, 0.2)'
    };

    const ForwardedNavLink = React.forwardRef<NavLink, NavLinkProps>(
        (props, ref) => <NavLink {...props} ref={ref}/>
    );
    return (
        <ListItem button component={ForwardedNavLink} to={to} activeStyle={activeStyle} exact={exact}>
            <ListItemIcon>
                {icon}
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
            <NavigationListItem to='/' exact={true} text='Home' icon={<HomeIcon/>}/>
            <NavigationListItem to='/system' text='System' icon={<SettingsIcon/>}/>
        </List>
    );
};