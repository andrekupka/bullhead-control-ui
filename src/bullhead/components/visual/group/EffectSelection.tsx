import React, {useState} from 'react';
import {Button, List, ListItem, ListItemText} from '@material-ui/core';
import {EffectMap} from '../../../model/Config';

interface Props {
    effects: EffectMap;
    onSelect: (effectType: string) => void;
}

export const EffectSelection = ({effects, onSelect}: Props) => {
    const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
    const hasSelection = selectedEffect !== null;

    const selectEffect = (effectType: string) => {
        if (selectedEffect === effectType) {
            setSelectedEffect(null);
        } else {
            setSelectedEffect(effectType);
        }
    };

    const publishSelection = () => {
        if (selectedEffect !== null) {
            onSelect(selectedEffect);
        }
    };

    return <div>
        <List>
            {Object.keys(effects).map(effectType =>
                <ListItem key={effectType}
                          selected={effectType === selectedEffect}
                          onClick={() => selectEffect(effectType)}>
                    <ListItemText>
                        {effects[effectType]}
                    </ListItemText>
                </ListItem>
            )}
        </List>
        <Button disabled={!hasSelection} onClick={() => publishSelection()}>Create</Button>
    </div>;
};