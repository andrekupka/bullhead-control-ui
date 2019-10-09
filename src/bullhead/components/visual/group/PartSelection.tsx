import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    availableParts: Array<string>;
    selectedParts: Array<string>;
    updateSelectedParts: (selectedParts: Array<string>) => void;
}

const useStyles = makeStyles({
    selectedIcon: {
        color: 'green'
    },
    unselectedIcon: {
        color: 'red'
    }
});

export const PartSelection = ({availableParts, selectedParts, updateSelectedParts}: Props) => {
    const classes = useStyles();

    const isSelected = (part: string) => selectedParts.indexOf(part) >= 0;

    const togglePart = (part: string) => {
        if (isSelected(part)) {
            updateSelectedParts(selectedParts.filter(p => p !== part));
        } else {
            updateSelectedParts([...selectedParts, part])
        }
    };

    return <div>
        <List>
            {availableParts.map((part) =>
                <ListItem button key={part}
                          onClick={() => togglePart(part)}
                          selected={isSelected(part)}>
                    <ListItemText>
                        {part}
                    </ListItemText>
                    <ListItemIcon>
                        {isSelected(part) ?
                            <DoneIcon className={classes.selectedIcon}/> :
                            <CloseIcon className={classes.unselectedIcon}/>}
                    </ListItemIcon>
                </ListItem>
            )}
        </List>
    </div>;
};