import {makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import {Visual} from '../../../model/Visual';
import {CardGridItem} from '../../common/card-grid/CardGridItem';

interface Props {
    visual: Visual;
}

export const VisualCard = ({visual}: Props) => {
    const title = (
        <>
            <Typography variant='h5' component='div' noWrap>
                {visual.name}
            </Typography>
        </>
    );

    return (
        <CardGridItem title={title}/>
    );
};