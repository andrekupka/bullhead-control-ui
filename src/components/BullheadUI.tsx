import React from 'react';
import {CssBaseline} from '@material-ui/core';
import {NavBar} from './navbar/NavBar';

export const BullheadUI = () => {
    return <CssBaseline>
        <div>
            <NavBar/>
        </div>
    </CssBaseline>;
};