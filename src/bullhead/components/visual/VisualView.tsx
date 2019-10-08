import {VisualWithGroupIds} from '../../model/Visual';
import {LightBullState} from '../../state';
import {selectVisual} from '../../state/model/visuals/selectors';
import {connect} from 'react-redux';
import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {VisualName} from './VisualName';
import {selectVisualHasProgress} from '../../state/app/visuals/selectors';
import {
    Box,
    Card,
    CardContent,
    createStyles,
    Divider,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme
} from '@material-ui/core';
import {DeleteVisualButton} from './DeleteVisualButton';
import {selectParts} from '../../state/model/config/selectors';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {LightBullToolbar} from '../common/LightBullToolbar';
import {selectGroupsOfVisual} from '../../state/model/groups/selectors';
import {GroupCollection} from '../../model/Group';

interface Props {
    showId: string;
    visual: VisualWithGroupIds;
    groups: GroupCollection;
    remainingParts: Array<string>
    hasProgress: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        padding: 0
    },
    panel: {
        marginBottom: theme.spacing(2)
    }
}));

const PureVisualView = ({showId, visual, groups, remainingParts, hasProgress}: Props) => {
    const [selected, setSelected] = useState(remainingParts.map(part => false));

    const classes = useStyles();

    if (!visual) {
        return <Redirect to={`/shows/${showId}`}/>;
    }

    const select = (index: number) => {
        const newSelected = [...selected];
        newSelected[index] = !newSelected[index];
        setSelected(newSelected);
    };

    return <>
        <Box display='flex'>
            <VisualName isDisabled={hasProgress} visual={visual}/>
            <Box flexGrow={1}/>
            <DeleteVisualButton isDisabled={hasProgress} showId={visual.showId} visualId={visual.id}/>
        </Box>

        <LightBullToolbar/>

        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card>
                    {remainingParts.length > 0 ?
                    <List className={classes.card}>
                        {remainingParts.map((part, index) => <div key={part}>
                            <ListItem selected={selected[index]} onClick={() => select(index)}>
                                <ListItemIcon>
                                    {selected[index] ? <DoneIcon/> : <CloseIcon/>}
                                </ListItemIcon>
                                <ListItemText>
                                    {part}
                                </ListItemText>
                            </ListItem>
                            {index < remainingParts.length - 1 && <Divider/>}
                        </div>
                        )}
                    </List> :
                        <CardContent><p>No remaining parts</p></CardContent>
                    }
                </Card>
            </Grid>

            <Grid item xs={12}>
                {groups.map((group, index) =>
                    <Card className={classes.panel} key={group.id}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary>
                                {group.parts.join(', ')}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                Effect: {group.effect.type}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Card>
                )}
            </Grid>
        </Grid>
    </>;
};

interface WrapperProps {
    showId: string;
    visualId: string;
}

const mapStateToProps = (state: LightBullState, {showId, visualId}: WrapperProps) => {
    const groups = selectGroupsOfVisual(state, visualId);
    const parts = new Set(selectParts(state));
    groups.forEach(group => group.parts.forEach(part => parts.delete(part)));

    return {
        showId: showId,
        visual: selectVisual(state, visualId),
        groups: groups,
        remainingParts: Array.from(parts),
        hasProgress: selectVisualHasProgress(state, visualId)
    };
};

export const VisualView = connect(
    mapStateToProps
)(PureVisualView);