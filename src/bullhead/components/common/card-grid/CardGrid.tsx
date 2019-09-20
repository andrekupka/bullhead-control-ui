import {Box, createStyles, Grid, makeStyles, Theme} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    gridContainer: {
        marginTop: theme.spacing(2)
    },
    gridItem: {
        height: 100
    },
    gridContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

interface Props {
    cards: Array<{ id: string, element: JSX.Element }>
    action?: JSX.Element
}

export const CardGrid = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.gridContainer}>
            {props.cards.map(item =>
                <Grid item xs={4} key={item.id} className={classes.gridItem}>
                    {item.element}
                </Grid>
            )}
            {props.action &&
                <Grid item xs={4} className={classes.gridItem}>
                    <Box display='flex' flexDirection='column' justifyContent='center' height='100%'>
                        {props.action}
                    </Box>
                </Grid>
            }
        </Grid>
    );
};