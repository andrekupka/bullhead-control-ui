import {connect} from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    ClickAwayListener,
    Step,
    StepContent,
    StepLabel,
    Stepper, Typography
} from '@material-ui/core';
import React, {useState} from 'react';
import {PartSelection} from './PartSelection';
import {EffectSelection} from './EffectSelection';
import {EffectMap} from '../../../model/Config';
import {LightBullState} from '../../../state';
import {selectEffects} from '../../../state/model/config/selectors';

interface Props {
    close: () => void;
    availableParts: Array<string>;
    effects: EffectMap;
}

const PureCreateGroupCard = ({close, availableParts, effects}: Props) => {
    const [isSelectingParts, setSelectingParts] = useState(true);

    const [selectedParts, setSelectedParts] = useState<Array<string>>([]);
    const [selectedEffect, setSelectedEffect] = useState<string|null>(null);

    const selectParts = (parts: Array<string>) => {
        setSelectingParts(false);
        setSelectedParts(parts);
    };

    const selectEffect = (effect: string) => {
        setSelectedEffect(effect);
    };

    const title = isSelectingParts ? 'Select parts' : 'Select effect';
    const content = isSelectingParts ?
        <PartSelection availableParts={availableParts} onSelect={parts => selectParts(parts)}/> :
        <EffectSelection effects={effects} onSelect={effect => selectEffect(effect)}/>;

    return <ClickAwayListener onClickAway={() => close()}>
        <Card>
            <CardHeader title={title}/>
            <CardContent>
                {content}
                <Button></Button>
            </CardContent>
        </Card>
    </ClickAwayListener>;
};

const mapStateToProps = (state: LightBullState) => ({
    effects: selectEffects(state)
});

export const CreateGroupCard = connect(
    mapStateToProps
)(PureCreateGroupCard);