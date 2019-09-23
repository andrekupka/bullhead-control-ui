import {Box, CardHeader, makeStyles} from '@material-ui/core';
import React from 'react';
import {CardGridItem} from "./CardGridItem";

interface Props {
    title: JSX.Element;
    action?: JSX.Element;
    onClick?: () => void;
    showHover?: boolean;
    isDisabled?: boolean;
}

const useStyles = makeStyles({
    header: {
        width: '100%',
        height: '100%'
    },
    titleWrapper: {
        '& > *:first-child': {
            flexGrow: 1
        }
    }
});

export const TitledActionCardGridItem = (props: Props) => {
    const classes = useStyles();

    const title = <Box display='flex' flexDirection='horizontal' className={classes.titleWrapper}>
        {props.title}
    </Box>;

    return (
        <CardGridItem showHover={props.showHover} showDarkened={props.isDisabled} onClick={props.onClick}>
            <CardHeader className={classes.header} avatar={props.action} title={title} disableTypography/>
        </CardGridItem>
    );
};