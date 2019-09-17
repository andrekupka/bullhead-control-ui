import {FormControlLabel, Switch} from '@material-ui/core';
import {SwitchProps} from '@material-ui/core/Switch';
import React from 'react';

interface Props extends SwitchProps {
    label: string;
}

export const LabelledSwitch = (props: Props) => {
    const {label, ...rest} = props;

    return (
        <FormControlLabel control={
            <Switch {...rest}/>
        } label={label}/>
    );
};