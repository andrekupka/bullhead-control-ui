import React, {FunctionComponent} from "react";
import {Card, makeStyles} from "@material-ui/core";
import classNames from "classnames";

interface Props {
    onClick?: () => void;
    showHover?: boolean;
    showDarkened?: boolean;
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
    darkened: {
        filter: 'brightness(80%)'
    }
});

export const CardGridItem: FunctionComponent<Props> = props => {
    const classes = useStyles();

    const shouldShowHover = props.showHover !== undefined ? props.showHover : true;
    const shouldShowDarkened = props.showDarkened || false;

    const cardClasses = classNames(
        classes.card,
        shouldShowDarkened && classes.darkened,
        shouldShowHover && classes.cardHover
    );

    return <Card className={cardClasses} onClick={() => props.onClick && props.onClick()}>
        {props.children}
    </Card>;
};