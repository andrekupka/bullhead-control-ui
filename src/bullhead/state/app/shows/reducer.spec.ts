import {ShowsActions} from './actions';
import {appShowsReducer} from './reducer';

describe('app shows reducer', () => {
    it('should return no new show id as initial state', () => {
        const state = appShowsReducer(undefined, {} as any);

        expect(state).toEqual({});
    });

    it ('should set new show id on set show id action', () => {
        const state = appShowsReducer(undefined, ShowsActions.setNewShowId('1'));
        expect(state).toEqual({
            newShowId: '1'
        });
    });

    it ('should reset show id on reset action', () => {
        const state = appShowsReducer({
            newShowId: 'id',
        }, ShowsActions.resetNewShowId());

        expect(state).toEqual({});
    });
});