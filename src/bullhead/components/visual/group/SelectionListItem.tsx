import {ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

interface Props {
    title: string;
    selected: boolean;
    onSelect: () => void;
}

const useStyles = makeStyles({
    selectedIcon: {
        color: 'green'
    },
    unselectedIcon: {
        color: 'red'
    }
});


export const SelectionListItem = ({title, selected, onSelect}: Props) => {
    const classes = useStyles();

    return <ListItem button
              onClick={() => onSelect()}
              selected={selected}>
        <ListItemText>
            {title}
        </ListItemText>
        <ListItemIcon>
            {selected ?
                <DoneIcon className={classes.selectedIcon}/> :
                <CloseIcon className={classes.unselectedIcon}/>}
        </ListItemIcon>
    </ListItem>;
};