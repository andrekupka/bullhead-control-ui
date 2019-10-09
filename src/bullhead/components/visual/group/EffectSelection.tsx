import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {EffectMap} from '../../../model/Config';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    effects: EffectMap;
    selectedEffect: string | null;
    updateSelectedEffect: (effectType: string | null) => void;
}

const useStyles = makeStyles({
    selectedIcon: {
        color: 'green'
    },
    unselectedIcon: {
        color: 'red'
    }
});

export const EffectSelection = ({effects, selectedEffect, updateSelectedEffect}: Props) => {
    const classes = useStyles();

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
                          onClick={() => selectEffect(effectType)}
                          selected={effectType === selectedEffect}>
                    <ListItemText>
                        {effects[effectType]}
                    </ListItemText>
                    <ListItemIcon>
                        {effectType === selectedEffect ?
                            <DoneIcon className={classes.selectedIcon}/> :
                            <CloseIcon className={classes.unselectedIcon}/>}
                    </ListItemIcon>
                </ListItem>
            )}
        </List>
    </div>;
};