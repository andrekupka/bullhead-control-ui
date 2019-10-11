import {VisualWithGroupIds} from '../../model/Visual';
import {LightBullState} from '../../state';
import {selectVisual} from '../../state/model/visuals/selectors';
import {connect} from 'react-redux';
import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Redirect} from 'react-router-dom';
import {VisualName} from './VisualName';
import {selectVisualHasProgress} from '../../state/app/visuals/selectors';
import {Box, Card, createStyles, Fab, Grid, makeStyles, Theme} from '@material-ui/core';
import {DeleteVisualButton} from './DeleteVisualButton';
import {selectGroupsOfVisual} from '../../state/model/groups/selectors';
import {GroupCollection} from '../../model/Group';
import {GroupPanel} from './group/GroupPanel';
import {CreateGroupCard} from './group/CreateGroupCard';
import {selectAvailableParts} from '../../state/model/config/selectors';

interface Props {
    showId: string;
    visual: VisualWithGroupIds;
    groups: GroupCollection;
    availableParts: Array<string>;
    hasProgress: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    panel: {
        marginBottom: theme.spacing(2)
    }
}));

const PureVisualView = ({showId, visual, groups, availableParts, hasProgress}: Props) => {
    const classes = useStyles();

    const [isCreating, setCreating] = useState(false);

    if (!visual) {
        return <Redirect push to={`/shows/${showId}`}/>;
    }

    const actionsDisabled = hasProgress || isCreating;

    const content = isCreating ?
        <CreateGroupCard visualId={visual.id}
                         availableParts={availableParts}
                         close={() => setCreating(false)}/> :
        <>
            {groups.map((group, index) =>
                <Card className={classes.panel} key={group.id}>
                    <GroupPanel group={group}/>
                </Card>
            )}
            {availableParts.length > 0 && <Fab color='primary' onClick={() => setCreating(true)}>
                <AddIcon/>
            </Fab>}
        </>;

    return <>
        <Box display='flex'>
            <VisualName isDisabled={actionsDisabled} visual={visual}/>
            <Box flexGrow={1}/>
            <DeleteVisualButton isDisabled={actionsDisabled} visualId={visual.id}/>
        </Box>

        <Grid container spacing={2}>
            <Grid item xs={12}>
                {content}
            </Grid>
        </Grid>
    </>;
};

interface WrapperProps {
    showId: string;
    visualId: string;
}

const mapStateToProps = (state: LightBullState, {showId, visualId}: WrapperProps) => ({
    showId: showId,
    visual: selectVisual(state, visualId),
    groups: selectGroupsOfVisual(state, visualId),
    availableParts: selectAvailableParts(state, visualId),
    hasProgress: selectVisualHasProgress(state, visualId)
});

export const VisualView = connect(
    mapStateToProps
)(PureVisualView);