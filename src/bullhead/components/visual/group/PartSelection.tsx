import React from 'react';
import {List, ListItem, ListItemText, Paper} from '@material-ui/core';

interface Props {
    availableParts: Array<string>;
    selectedParts: Array<string>;
    updateSelectedParts: (selectedParts: Array<string>) => void;
}

export const PartSelection = ({availableParts, selectedParts, updateSelectedParts}: Props) => {
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
                <ListItem button key={part} onClick={() => togglePart(part)} selected={isSelected(part)}>
                    <ListItemText>
                        {part}
                    </ListItemText>
                </ListItem>
            )}
        </List>
    </div>;
};