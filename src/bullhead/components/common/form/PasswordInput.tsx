import React, {useState} from 'react';
import {IconButton, InputAdornment, TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export const PasswordInput = (props: TextFieldProps) => {
    const [visible, setVisible] = useState(false);

    const type = visible ? 'text' : 'password';

    const eye = visible ? <VisibilityOffIcon/> : <VisibilityIcon/>;

    const adornment = (
        <InputAdornment position='end'>
            <IconButton onClick={() => setVisible(!visible)} onMouseDown={event => event.preventDefault()}>
                {eye}
            </IconButton>
        </InputAdornment>
    );

    return (
        <TextField type={type}
                   {...props}
                   InputProps={{
                       endAdornment: adornment
                   }}/>
    );
};