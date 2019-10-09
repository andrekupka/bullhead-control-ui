import React, {useState} from 'react';
import {Button, List, ListItem, ListItemText} from '@material-ui/core';

interface Props {
    availableParts: Array<string>;
    onSelect: (selectedParts: Array<string>) => void;
}

export const PartSelection = ({availableParts, onSelect}: Props) => {
    const [selectedParts, setSelectedParts] = useState(availableParts.map(() => false) as Array<boolean>);

    const hasSelection = selectedParts.find(value => value) !== undefined;

    const toggle = (index: number) => {
        setSelectedParts(selected => {
            const updated = [...selected];
            updated[index] = !updated[index];
            return updated;
        })
    };

    const selectParts = () => {
        const parts = availableParts.filter((part, index) => selectedParts[index]);
        onSelect(parts);
    };

    return <div>
        <List>
            {availableParts.map((part, index) =>
                <ListItem key={part} onClick={() => toggle(index)} selected={selectedParts[index]}>
                    <ListItemText>
                        {part}
                    </ListItemText>
                </ListItem>
            )}
        </List>
        <Button disabled={!hasSelection} onClick={() => selectParts()}>Next</Button>
    </div>;
};