import {AuthenticationActions} from '../../authentication/actions';
import {ResetActions} from '../../reset/actions';
import {ShowModelActions} from './actions';
import {showsReducer} from './reducer';

const firstShow = {
    id: '1',
    name: 'First Show',
    favorite: false,
    visuals: []
};

const secondShow = {
    id: '2',
    name: 'Second Show',
    favorite: true,
    visuals: []
};

describe('shows reducer', () => {
    it('should return empty show map as initial state', () => {
        const state = showsReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it('should initialize shows on initialize shows action', () => {
        const state = showsReducer(undefined, ShowModelActions.initialize([firstShow]));

        expect(state).toEqual({
            [firstShow.id]: firstShow
        });
    });

    it('should insert show on add show action', () => {
        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.add(secondShow));

        expect(state).toEqual({
            [firstShow.id]: firstShow,
            [secondShow.id]: secondShow
        });
    });

    it('should update existing show', () => {
        const updatedShow = {
            id: '1',
            name: 'Updated Show',
            favorite: true,
            visuals: []
        };

        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.update(updatedShow));

        expect(state).toEqual({
            [firstShow.id]: updatedShow
        });
    });

    it('should ignore update for none existing show', () => {
        const state = showsReducer({
            [secondShow.id]: secondShow
        }, ShowModelActions.update(firstShow));

        expect(state).toEqual({
            [secondShow.id]: secondShow
        });
    });
});
