import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {LightBullState} from '../../../state';
import {UiShowDetailsAction, UiShowDetailsActions} from '../../../state/ui/show-details/actions';
import {selectVisualsFilter} from '../../../state/ui/show-details/selectors';
import {FilterToolbar} from '../../common/FilterToolbar';
import {SearchInput} from '../../common/form/SearchInput';

interface Props {
    filter: string;
    setFilter: (filter: string) => void;
}

export const PureShowDetailsFilterToolbar = ({filter, setFilter}: Props) => {
    return (
        <FilterToolbar hasFilter={!!filter} onClear={() => setFilter('')}>
            <SearchInput placeholder='Search visuals…'
                         value={filter}
                         onChange={event => setFilter(event.target.value)}/>
        </FilterToolbar>
    );
};

const mapStateToProps = (state: LightBullState) => ({
    filter: selectVisualsFilter(state)
});

const mapDispatchToProps = (dispatch: Dispatch<UiShowDetailsAction>) => ({
    setFilter: (filter: string) => dispatch(UiShowDetailsActions.setVisualsFilter(filter))
});

export const ShowDetailsFilterToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(PureShowDetailsFilterToolbar);

