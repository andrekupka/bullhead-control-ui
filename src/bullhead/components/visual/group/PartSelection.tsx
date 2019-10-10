import React from 'react';
import {List} from '@material-ui/core';
import {SelectionListItem} from './SelectionListItem';

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
                <SelectionListItem key={part}
                                   title={part}
                                   selected={isSelected(part)}
                                   onSelect={() => togglePart(part)}/>
            )}
        </List>
    </div>;
};