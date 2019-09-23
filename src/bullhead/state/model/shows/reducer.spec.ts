import {ShowModelActions} from './actions';
import {showsReducer} from './reducer';

const firstShow = {
    id: '1',
    name: 'First Show',
    favorite: false,
    visuals: ['v1']
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

    it('should set all shows on set all action', () => {
        const state = showsReducer(undefined, ShowModelActions.setAll([firstShow]));

        expect(state).toEqual({
            [firstShow.id]: firstShow
        });
    });

    it('should insert show on set action', () => {
        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.set(secondShow));

        expect(state).toEqual({
            [firstShow.id]: firstShow,
            [secondShow.id]: secondShow
        });
    });

    it('should update existing show on set action', () => {
        const updatedShow = {
            id: '1',
            name: 'Updated Show',
            favorite: true,
            visuals: []
        };

        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.set(updatedShow));

        expect(state).toEqual({
            [firstShow.id]: updatedShow
        });
    });

    it('should add visual to existing show on add visual action', () => {
        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.addVisual(firstShow.id, 'v2'));

        expect(state).toEqual({
            [firstShow.id]: {
                id: firstShow.id,
                name: firstShow.name,
                favorite: firstShow.favorite,
                visuals: ['v1', 'v2']
            }
        });
    });

    it('should ignore add visual action for unknown show id', () => {
        const state = showsReducer({
            [firstShow.id]: firstShow
        }, ShowModelActions.addVisual('unknown', 'v2'));

        expect(state).toEqual({
            [firstShow.id]: firstShow
        });
    });
});
