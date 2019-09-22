import React, {FormEvent, useState} from "react";
import {Redirect} from "react-router";
import {LightBullState} from "../../state";
import {LightBullThunkDispatch} from "../../types/redux";
import {createShow} from "../../state/app/shows/thunks";
import {ShowCreationActions} from "../../state/app/shows/create/actions";
import {connect} from "react-redux";
import {CardGridItem} from "../common/card-grid/CardGridItem";
import {
    Box,
    CardHeader,
    makeStyles,
    TextField,
    ClickAwayListener,
    IconButton,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    close: () => void;

    isPending: boolean;
    newShowId?: string;
    error?: string;

    finishCreation: () => void;
    createShow: (name: string) => void;
}

const useStyles = makeStyles({
    fullWidth: {
        width: '100%'
    },
    header: {
        width: '100%',
        height: '100%'
    }
});

const PureCreateShowCard = (props: Props) => {
    const classes = useStyles();

    const [name, setName] = useState('');

    const close = () => {
        props.close();
        props.finishCreation();
    };

    if (props.newShowId) {
        close();
        return <Redirect to={`/shows/${props.newShowId}`}/>;
    }

    const canSubmit = !!name;

    const createShow = (event: FormEvent) => {
        event.preventDefault();
        if (canSubmit) {
            props.createShow(name);
        }
    };

    const nameForm = <Box display='flex' justifyContent='center'>
        {props.isPending ?
            <CircularProgress/> :
            <form name='addShow' onSubmit={createShow} className={classes.fullWidth}>
                <TextField autoFocus
                           label='Show Name'
                           fullWidth
                           variant='outlined'
                           onChange={event => setName(event.target.value)}
                           InputProps={{
                               endAdornment: <IconButton onClick={() => close()}>
                                   <CloseIcon/>
                               </IconButton>
                           }}/>
            </form>
        }
    </Box>;

    return <ClickAwayListener onClickAway={() => close()}>
        <span>
            <CardGridItem>
                <CardHeader title={nameForm} className={classes.header}/>
            </CardGridItem>
        </span>
    </ClickAwayListener>;
};


const mapStateToProps = (state: LightBullState) => ({
    ...state.app.shows.creation
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    createShow: (name: string) => dispatch(createShow(name)),
    finishCreation: () => dispatch(ShowCreationActions.reset())
});

export const CreateShowCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCreateShowCard);
