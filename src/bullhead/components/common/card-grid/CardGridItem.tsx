import {Box, Card, CardHeader, makeStyles} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

interface Props {
    title: JSX.Element;
    action?: JSX.Element;
    onClick?: () => void;
    showHover?: boolean;
    isDisabled?: boolean;
}

const useStyles = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '80px'
    },
    cardHover: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);'
        }
    },
    header: {
        width: '100%',
        height: '100%'
    },
    darken: {
        filter: 'brightness(80%)'
    },
    titleWrapper: {
        '& > *:first-child': {
            flexGrow: 1
        }
    }
});

export const CardGridItem = (props: Props) => {
    const classes = useStyles();

    const shouldShowHover = props.showHover || true;
    const shouldShowDarken = props.isDisabled || false;

    const cardClasses = classNames(
        classes.card,
        shouldShowDarken && classes.darken,
        shouldShowHover && classes.cardHover
    );

    const title = <Box display='flex' flexDirection='horizontal' className={classes.titleWrapper}>
        {props.title}
    </Box>;

    return (
        <Card className={cardClasses} onClick={() => props.onClick && props.onClick()}>
            <CardHeader className={classes.header} avatar={props.action} title={title} disableTypography/>
        </Card>
    );
};