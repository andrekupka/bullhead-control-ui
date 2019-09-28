import React from 'react';
import {Box, CircularProgress, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';

interface Props {
    title: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    leftProgress: {
        marginRight: theme.spacing(2)
    }
}));

export const LoadingPage = ({title}: Props) => {
    const classes = useStyles();

    return <Box display='flex' justifyContent='center' alignItems='center' marginTop={4}>
        <Typography variant='h4'>
            <CircularProgress className={classes.leftProgress}/>
            {title}
        </Typography>
    </Box>;
};