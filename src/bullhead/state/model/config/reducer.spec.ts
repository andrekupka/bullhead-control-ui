import {ConfigModelActions} from './actions';
import {configReducer} from "./reducer";

describe('config reducer', () => {
    it('should return empty config as initial state', () => {
        const state = configReducer(undefined, {} as any);

        expect(state).toEqual({
            parts: [],
            effects: {},
            features: []
        });
    });

    it ('should initialize config on initialize action', () => {
        const config = {
            parts: ['part_name'],
            effects: {
                'effect': 'Effect Name'
            },
            features: ['feature_name']
        };

        const state = configReducer(undefined, ConfigModelActions.initialize(config));
    })
});
