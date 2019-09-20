import {makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import {Visual} from '../../../model/Visual';
import {CardGridItem} from '../../common/card-grid/CardGridItem';

interface Props {
    visual: Visual;
}

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});

export const VisualCard = ({visual}: Props) => {
    const classes = useStyles();

    const title = (
        <>
            <Typography variant='h5' component='div' noWrap className={classes.title}>
                {visual.name}
            </Typography>
        </>
    );

    return (
        <CardGridItem title={title}/>
    );
};