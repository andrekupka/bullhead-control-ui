import {ConnectionActions} from './actions';
import {connectionReducer} from './reducer';

describe('connection reducer', () => {
    it('should return unidentified initial state', () => {
        const state = connectionReducer(undefined, {} as any);

        expect(state).toEqual({
            isIdentifying: false
        });
    });

    it('should start identifying on identify action', () => {
        const state = connectionReducer(undefined, ConnectionActions.identify());

        expect(state).toEqual({
            isIdentifying: true
        });
    });

    it('should set connection id and stop identifying when identified', () => {
        const state = connectionReducer({
            isIdentifying: true
        }, ConnectionActions.identified('id1'));

        expect(state).toEqual({
            isIdentifying: false,
            connectionId: 'id1'
        });
    });

    it('should stop identifying when connection is destroyed during identification', () => {
        const state = connectionReducer({
            isIdentifying: true
        }, ConnectionActions.destroy());

        expect(state).toEqual({
            isIdentifying: false
        });
    });

    it ('should reset identification when connection is destroyed', () => {
        const state = connectionReducer({
            isIdentifying: false,
            connectionId: 'id1'
        }, ConnectionActions.destroy());

        expect(state).toEqual({
            isIdentifying: false
        });
    })
});