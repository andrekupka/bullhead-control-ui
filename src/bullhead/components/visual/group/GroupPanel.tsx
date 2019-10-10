import {Group} from '../../../model/Group';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {LightBullState} from '../../../state';
import {selectEffectName} from '../../../state/model/config/selectors';

interface Props {
    group: Group;
    effectName: string;
}

const PureGroupPanel = ({group, effectName}: Props) => {
    return <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography variant='h6'>
                {effectName} &rarr; [{group.parts.join(', ')}]
            </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            Effect: {group.effect.type}
        </ExpansionPanelDetails>
    </ExpansionPanel>;
};

interface WrapperProps {
    group: Group;
}

const mapStateToProps = (state: LightBullState, {group}: WrapperProps) => ({
    group: group,
    effectName: selectEffectName(state, group.effect.type)
});

export const GroupPanel = connect(
    mapStateToProps
)(PureGroupPanel);