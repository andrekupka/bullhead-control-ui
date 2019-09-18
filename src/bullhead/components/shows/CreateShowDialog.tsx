import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import React, {FormEvent, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LightBullState} from '../../state';
import {ShowCreationActions} from '../../state/app/shows/create/actions';
import {addShow} from '../../state/app/shows/thunks';
import {LightBullThunkDispatch} from '../../types/redux';
import {ProgressAwareButton} from '../common/form/ProgressAwareButton';

interface Props {
    close: () => void;

    isPending: boolean;
    newShowId?: string;
    error?: string;

    finishCreation: () => void;
    addShow: (name: string) => void;
}

const PureCreateShowDialog = (props: Props) => {
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

    const addShow = (event: FormEvent) => {
        event.preventDefault();
        if (canSubmit) {
            props.addShow(name);
        }
    };

    return (
        <Dialog open={true} onClose={close}>
            <DialogTitle>Add a new show</DialogTitle>
            <DialogContent>
                <form name='addShow' onSubmit={addShow}>
                    <TextField autoFocus
                               label='Name'
                               fullWidth
                               onChange={event => setName(event.target.value)}/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' disabled={props.isPending} onClick={close}>
                    Cancel
                </Button>

                <ProgressAwareButton variant='contained'
                                     color='primary'
                                     disabled={!canSubmit}
                                     hasProgress={props.isPending}
                                     onClick={addShow}>
                    Add Show
                </ProgressAwareButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    ...state.app.shows.creation
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    addShow: (name: string) => dispatch(addShow(name)),
    finishCreation: () => dispatch(ShowCreationActions.reset())
});

export const CreateShowDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureCreateShowDialog);