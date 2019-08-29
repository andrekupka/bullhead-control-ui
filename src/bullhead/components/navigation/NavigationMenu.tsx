import {Drawer, List, ListItem} from '@material-ui/core';
import React from 'react';

interface Props {
    isOpen: boolean;
}

export const NavigationMenu = (props: Props) => {
    return (
        <Drawer variant="persistent" open={props.isOpen}>
            <List>
                <ListItem>
                    Test
                </ListItem>
            </List>
        </Drawer>
    );
};