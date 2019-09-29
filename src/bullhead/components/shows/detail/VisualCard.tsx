import {Typography} from '@material-ui/core';
import React, {useState} from 'react';
import {Visual} from '../../../model/Visual';
import {TitledActionCardGridItem} from '../../common/card-grid/TitledActionCardGridItem';
import {Redirect} from 'react-router';

interface Props {
    showId: string;
    isDisabled: boolean;
    visual: Visual;
}

export const VisualCard = ({showId, isDisabled, visual}: Props) => {
    const [shouldOpen, setShouldOpen] = useState(false);
    if (shouldOpen) {
        return <Redirect to={`/shows/${showId}/visuals/${visual.id}`}/>;
    }

    const open = () => {
        if (!isDisabled) {
            setShouldOpen(true);
        }
    };

    const title = <Typography variant='h5' component='div' noWrap>
        {visual.name}
    </Typography>;

    return <TitledActionCardGridItem title={title}
                                     isDisabled={isDisabled}
                                     showHover={!isDisabled}
                                     onClick={open}/>;
};