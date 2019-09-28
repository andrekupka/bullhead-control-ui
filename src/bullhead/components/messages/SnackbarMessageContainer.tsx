import {createStyles, IconButton, makeStyles, Snackbar, Theme} from '@material-ui/core';
import {amber, green} from '@material-ui/core/colors';
import {SnackbarOrigin} from '@material-ui/core/Snackbar';
import {SvgIconProps} from '@material-ui/core/SvgIcon';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {SnackbarMessageWithId} from '../../model/SnackbarMessage';
import {LightBullState} from '../../state';
import {LightBullThunkDispatch} from '../../types/redux';
import {closeMessage} from '../../state/ui/messages/thunks';

interface Props {
    message?: SnackbarMessageWithId;
    closeMessage: (messageId: string) => void;
}

type VariantIconMap = { [variant: string]: React.ComponentType<SvgIconProps> };

const variantIcons: VariantIconMap = {
    success: CheckCircleIcon,
    information: InfoIcon,
    warning: WarningIcon,
    error: ErrorIcon
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {
        color: theme.palette.text.primary
    },
    success: {
        backgroundColor: green[600]
    },
    information: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}));

export const PureSnackbarMessageContainer = ({message, closeMessage}: Props) => {
    const classes = useStyles();

    if (!message) {
        return <></>;
    }

    const {text, variant} = message;

    const Icon = variantIcons[variant];

    const anchor: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'right'
    };

    return (
        <Snackbar open={true}
                  anchorOrigin={anchor}
                  message={
                      <span className={classes.message}>
                          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                          {text}
                      </span>
                  }
                  ContentProps={{
                      className: classNames(classes[variant], classes.content)
                  }}
                  action={
                      <IconButton color='inherit' onClick={() => closeMessage(message.id)}>
                          <CloseIcon className={classes.icon}/>
                      </IconButton>
                  }>
        </Snackbar>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    message: state.ui.messages.messages.length > 0 ? state.ui.messages.messages[0] : undefined
});

const mapDispatchToProps = (dispatch: LightBullThunkDispatch) => ({
    closeMessage: (messageId: string) => dispatch(closeMessage(messageId))
});

export const SnackbarMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureSnackbarMessageContainer);