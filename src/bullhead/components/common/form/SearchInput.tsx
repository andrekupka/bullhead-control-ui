import {InputAdornment, TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

export const SearchInput = (props: TextFieldProps) => {
    const {placeholder, InputProps, ...rest} = props;
    const computedPlaceholder = placeholder || 'Search…';
    const inputProps = Object.assign({
        startAdornment: <InputAdornment position='start'>
            <SearchIcon/>
        </InputAdornment>
    }, InputProps || {});
    return (
        <TextField
            placeholder={computedPlaceholder}
            InputProps={inputProps}
            {...rest}
        />
    );
};