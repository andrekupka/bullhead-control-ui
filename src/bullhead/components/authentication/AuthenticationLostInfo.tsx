import React from "react";
import {Card, CardContent, createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    info: {
        marginBottom: theme.spacing(2)
    }
}));

export const AuthenticationLostInfo = () => {
    const classes = useStyles();

    return (
        <Card className={classes.info}>
            <CardContent>
                You have been logged out!
            </CardContent>
        </Card>
    );
};
