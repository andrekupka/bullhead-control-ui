import {Button} from '@material-ui/core';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SnackbarMessage, SnackbarMessageVariant} from '../../model/SnackbarMessage';
import {showMessage} from '../../state/ui/messages/thunks';
import {LightBullThunkDispatch} from '../../types/redux';
import {SnackbarMessageContainer} from '../messages/SnackbarMessageContainer';

interface Props {
    showMessage: (message: SnackbarMessage) => void;
}

const variants: Array<SnackbarMessageVariant> = ['success', 'information', 'warning', 'error'];

export const PureHome = (props: Props) => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome at LightBull.</p>
            <Button onClick={() => {
                setCount(count+1);
                props.showMessage({
                    text: `Hello World ${count}`,
                    variant: variants[count % 4]
                });
            }}>Message</Button>
            <SnackbarMessageContainer/>
        </div>
    );
};

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    showMessage: (message: SnackbarMessage) => dispatch(showMessage(message))
});

export const Home = connect(
    null,
    mapDispatchToProps
)(PureHome);