import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../state';
import {ShowsFilterAction, ShowsFilterActions} from '../../state/ui/shows/actions';
import {selectShowsFavoritesOnly, selectShowsFilter} from '../../state/ui/shows/selectors';
import {FilterToolbar} from '../common/FilterToolbar';
import {LabelledSwitch} from '../common/form/LabelledSwitch';
import {SearchInput} from '../common/form/SearchInput';

interface Props {
    filter: string;
    setFilter: (filter: string) => void;

    favoritesOnly: boolean;
    setFavoritesOnly: (favoritesOnly: boolean) => void;
}

export const PureShowsFilterToolbar = (props: Props) => {
    const clearFilters = () => {
        props.setFilter('');
        props.setFavoritesOnly(false);
    };

    const hasFilter = !props.filter && !props.favoritesOnly;

    return (
        <FilterToolbar hasFilter={hasFilter} onClear={clearFilters}>
            <SearchInput value={props.filter} onChange={event => props.setFilter(event.target.value)}/>
            <LabelledSwitch checked={props.favoritesOnly}
                            onChange={event => props.setFavoritesOnly(event.target.checked)}
                            label='Favorites only'/>
        </FilterToolbar>
    )
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