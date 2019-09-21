import {Box, Grid} from '@material-ui/core';
import React from 'react';

interface Props {
    cards: Array<{ id: string, element: JSX.Element }>
    action?: JSX.Element
}

export const CardGrid = (props: Props) => {
    return (
        <Grid container spacing={2}>
            {props.cards.map(item =>
                <Grid item xs={4} key={item.id}>
                    {item.element}
                </Grid>
            )}
            {props.action &&
                <Grid item xs={4}>
                    <Box display='flex' flexDirection='column' justifyContent='center' height='100%'>
                        {props.action}
                    </Box>
                </Grid>
            }
        </Grid>
    );
};