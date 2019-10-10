import React from 'react';
import {List} from '@material-ui/core';
import {EffectMap} from '../../../model/Config';
import {SelectionListItem} from './SelectionListItem';

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
                <SelectionListItem key={effectType}
                                   title={effects[effectType]}
                                   selected={effectType === selectedEffect}
                                   onSelect={() => selectEffect(effectType)}/>
            )}
        </List>
    </div>;
};