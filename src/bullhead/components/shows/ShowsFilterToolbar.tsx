import {Button, Card, createStyles, makeStyles, Theme, Toolbar} from '@material-ui/core';
import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {ShowsFilterAction, ShowsFilterActions} from '../../state/ui/shows/actions';
import {selectShowsFavoritesOnly, selectShowsFilter} from '../../state/ui/shows/selectors';
import {LabelledSwitch} from '../common/form/LabelledSwitch';
import {SearchInput} from '../common/form/SearchInput';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
    filter: string;
    setFilter: (filter: string) => void;

    favoritesOnly: boolean;
    setFavoritesOnly: (favoritesOnly: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: {
        display: 'flex',
        '& > *': {
            marginRight: theme.spacing(2)
        }
    },
    grow: {
        flexGrow: 1
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(-1)
    }
}));

export const PureShowsFilterToolbar = (props: Props) => {
    const classes = useStyles();

    const clearFilters = () => {
        props.setFilter('');
        props.setFavoritesOnly(false);
    };

    const clearDisabled = !props.filter && !props.favoritesOnly;

    return (
        <Card>
            <Toolbar className={classes.toolbar}>
                <SearchInput value={props.filter} onChange={event => props.setFilter(event.target.value)}/>
                <LabelledSwitch checked={props.favoritesOnly}
                                onChange={event => props.setFavoritesOnly(event.target.checked)}
                                label='Favorites only'/>
                <span className={classes.grow}/>
                <Button color='secondary' variant='contained' disabled={clearDisabled} onClick={() => clearFilters()}>
                    <ClearIcon className={classes.leftIcon}/>
                    Clear
                </Button>
            </Toolbar>
        </Card>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    filter: selectShowsFilter(state),
    favoritesOnly: selectShowsFavoritesOnly(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ShowsFilterAction>) => ({
    setFilter: (filter: string) => dispatch(ShowsFilterActions.setFilter(filter)),
    setFavoritesOnly: (favoritesOnly: boolean) => dispatch(ShowsFilterActions.setFavoritesOnly(favoritesOnly))
});

export const ShowsFilterToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowsFilterToolbar);