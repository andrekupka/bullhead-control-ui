import {Typography} from '@material-ui/core';
import React from 'react';
import {Visual} from '../../../model/Visual';
import {TitledActionCardGridItem} from '../../common/card-grid/TitledActionCardGridItem';

interface Props {
    visual: Visual;
}

export const VisualCard = ({visual}: Props) => {
    const title = <Typography variant='h5' component='div' noWrap>
                {visual.name}
            </Typography>;

    return <TitledActionCardGridItem title={title}/>;
};