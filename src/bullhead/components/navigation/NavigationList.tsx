import {List, ListItem, ListItemIcon, ListItemText, useTheme} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link, LinkGetProps} from '@reach/router';
import React, {FunctionComponent} from 'react';

interface NavigationListItemProps {
    to: string;
    text: string;
    icon: React.ComponentType
}

const NavigationListItem: FunctionComponent<NavigationListItemProps> = ({to, text, icon: Icon}) => {
    // TODO ListItem selected property should be used
    const getProps = ({isCurrent}: LinkGetProps) => {
      if (isCurrent) {
          return {
              style: {
                  background: 'rgba(255, 255, 255, 0.2)'
              }
          };
      }
      return {};
    };

    return (
        <ListItem button component={Link} to={to} getProps={getProps}>
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
            <NavigationListItem to='/' text='Home' icon={HomeIcon}/>
            <NavigationListItem to='/system' text='System' icon={SettingsIcon}/>
        </List>
    );
};