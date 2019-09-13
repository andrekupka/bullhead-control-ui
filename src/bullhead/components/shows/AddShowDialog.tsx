import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import React, {FormEvent, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LightBullState} from '../../state';
import {addShowEnd} from '../../state/shows/actions';
import {addShow} from '../../state/shows/thunks';
import {LightBullThunkDispatch} from '../../types/redux';
import {ProgressAwareButton} from '../common/form/ProgressAwareButton';

interface Props {
    isOpen: boolean;
    isPending: boolean;
    newShowId?: string;
    error?: string;

    finishAdding: () => void;
    addShow: (name: string) => void;
}

const PureAddShowDialog = (props: Props) => {
    const [name, setName] = useState('');

    const close = () => {
        if (!props.isPending) {
            props.finishAdding();
        }
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
        <Dialog open={props.isOpen} onClose={close}>
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
                <Button variant='outlined' onClick={close}>
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
    isOpen: state.shows.addMode.isActive,
    isPending: state.shows.addMode.isPending,
    newShowId: state.shows.addMode.newShowId,
    error: state.shows.addMode.error
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    addShow: (name: string) => dispatch(addShow(name)),
    finishAdding: () => dispatch(addShowEnd())
});

export const AddShowDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureAddShowDialog);