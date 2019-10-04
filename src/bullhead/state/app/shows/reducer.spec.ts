import {ShowsActions} from './actions';
import {appShowsReducer, newShowIdReducer} from './reducer';

describe('app shows reducer', () => {
    describe('new show id reducer', () => {
        it('should return no new show id as initial state', () => {
            const state = newShowIdReducer(undefined, {} as any);
            expect(state).toEqual(null);
        });

        it ('should set new show id on set show id action', () => {
            const state = newShowIdReducer(undefined, ShowsActions.setNewShowId('1'));
            expect(state).toEqual('1')
        });

        it ('should reset show id on reset action', () => {
            const state = newShowIdReducer('id', ShowsActions.resetNewShowId());
            expect(state).toEqual(null);
        });
    })

});