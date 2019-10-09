import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {EffectMap} from '../../../model/Config';

interface Props {
    effects: EffectMap;
    selectedEffect: string | null;
    updateSelectedEffect: (effectType: string | null) => void;
}

export const EffectSelection = ({effects, selectedEffect, updateSelectedEffect}: Props) => {

    const selectEffect = (effectType: string) => {
        if (selectedEffect === effectType) {
            updateSelectedEffect(null);
        } else {
            updateSelectedEffect(effectType);
        }
    };

    return <div>
        <List>
            {Object.keys(effects).map(effectType =>
                <ListItem button key={effectType}
                          selected={effectType === selectedEffect}
                          onClick={() => selectEffect(effectType)}>
                    <ListItemText>
                        {effects[effectType]}
                    </ListItemText>
                </ListItem>
            )}
        </List>
    </div>;
};