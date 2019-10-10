import {connect} from 'react-redux';
import {
    Button,
    Card,
    CardContent,
    ClickAwayListener,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import React, {FunctionComponent, useState} from 'react';
import {PartSelection} from './PartSelection';
import {EffectSelection} from './EffectSelection';
import {EffectMap} from '../../../model/Config';
import {LightBullState} from '../../../state';
import {selectEffects} from '../../../state/model/config/selectors';
import {selectRequestIsPending} from '../../../state/app/http/selectors';
import {CREATE_GROUP_LABEL, createGroupRequest} from '../../../state/app/groups/requests';
import {LightBullThunkDispatch} from '../../../types/redux';
import {HttpActions} from '../../../state/app/http/actions';
import {GroupActions} from '../../../state/app/groups/actions';
import {useReset} from '../../../utils/hooks/useReset';

interface Props {
    visualId: string;
    close: () => void;
    availableParts: Array<string>;
    effects: EffectMap;

    createGroup: (visualId: string, effectType: string, parts: Array<string>) => void;
    reset: () => void;

    isPending: boolean;
    newGroupId: string | null;
}

const useGridStyles = makeStyles({
    card: {
        height: '100%'
    },
});

const SelectionGridItem: FunctionComponent<{title: string}> = ({title, children}) => {
    const classes = useGridStyles();

    return <Grid item xs={6}>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant='h6'>{title}</Typography>
                {children}
            </CardContent>
        </Card>
    </Grid>;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        height: '100%'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const PureCreateGroupCard = ({visualId, close, availableParts, effects, createGroup, reset, isPending, newGroupId}: Props) => {
    const classes = useStyles();

    const [selectedParts, setSelectedParts] = useState<Array<string>>([]);
    const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

    useReset(reset);

    if (newGroupId !== null) {
        close();
        return null;
    }

    const canCreate = selectedParts.length > 0 && selectedEffect !== null;

    const createDisabled = !canCreate || isPending;

    const handleCreate = () => {
        if (canCreate) {
            // selected effect is not null because of canCreate condition
            createGroup(visualId, selectedEffect as string, selectedParts);
        }
    };

    return <>
        <Grid container spacing={2}>
            <SelectionGridItem title='Parts'>
                <PartSelection availableParts={availableParts}
                               selectedParts={selectedParts}
                               updateSelectedParts={parts => setSelectedParts(parts)}/>
            </SelectionGridItem>
            <SelectionGridItem title='Effects'>
                <EffectSelection effects={effects}
                                 selectedEffect={selectedEffect}
                                 updateSelectedEffect={effect => setSelectedEffect(effect)}/>
            </SelectionGridItem>
        </Grid>
        <div>
            <Button variant='contained'
                    className={classes.button}
                    disabled={isPending}
                    onClick={() => close()}>
                Cancel
            </Button>
            <Button variant='contained'
                    color='primary'
                    className={classes.button}
                    disabled={createDisabled}
                    onClick={() => handleCreate()}>
                Create group
            </Button>
        </div>
    </>;
};

const mapStateToProps = (state: LightBullState) => ({
    effects: selectEffects(state),
    isPending: selectRequestIsPending(state, CREATE_GROUP_LABEL),
    newGroupId: state.app.groups.newGroupId
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createGroup: (visualId: string, effectType: string, parts: Array<string>) =>
        dispatch(createGroupRequest(visualId, effectType, parts)),
    reset: () => {
        dispatch(HttpActions.reset(CREATE_GROUP_LABEL));
        dispatch(GroupActions.resetNewGroupId());
    }
});

export const CreateGroupCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCreateGroupCard);