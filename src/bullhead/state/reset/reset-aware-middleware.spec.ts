import {ActionType, getType, TypeConstant} from 'typesafe-actions';
import {createEmptyAction} from '../action-utils';
import {ResetActions} from './actions';
import {RAMMiddlewwareAPI, resetAwareMiddleware} from './reset-aware-middleware';

const TestActions = {
    trigger: createEmptyAction('@test/TRIGGER'),
    otherTrigger: createEmptyAction('@test/OTHER_TRIGGER'),
    noTrigger: createEmptyAction('@test/NO_TRIGGER')
};

type TestAction = ActionType<typeof TestActions>;

const createInvokeAndMocks = (...resettingActionTypes: Array<TypeConstant>) => {
    const store: RAMMiddlewwareAPI<{}> = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    };

    const next = jest.fn();

    const middleware = resetAwareMiddleware(resettingActionTypes);

    const invoke = (action: TestAction) => middleware(store)(next)(action);

    return {store, next, invoke};
};

describe('reset aware middleware', () => {
    it('should pass resetting action to next middleware', () => {
        const {next, invoke} = createInvokeAndMocks(getType(TestActions.trigger));

        const action = TestActions.trigger();
        invoke(action);

        expect(next).toHaveBeenCalledWith(action);
    });

    it('should pass none resetting action to next middleware', () => {
        const {next, invoke} = createInvokeAndMocks(getType(TestActions.trigger));

        const action = TestActions.noTrigger();
        invoke(action);

        expect(next).toHaveBeenCalledWith(action);
    });

    it('should be triggered by resetting action and dispatch reset action', () => {
        const {store, next, invoke} = createInvokeAndMocks(getType(TestActions.trigger));

        const action = TestActions.trigger();
        invoke(action);

        expect(store.dispatch).toHaveBeenCalledWith(ResetActions.reset());
    });

    it('should handle multiple resetting action types', () => {
        const {store, next, invoke} = createInvokeAndMocks(getType(TestActions.trigger),
            getType(TestActions.otherTrigger));

        const triggerAction = TestActions.trigger();
        const otherTriggerAction = TestActions.otherTrigger();

        invoke(triggerAction);
        invoke(otherTriggerAction);

        expect(next).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should ignore non resetting action', () => {
        const {store, next, invoke} = createInvokeAndMocks(getType(TestActions.trigger));

        const action = TestActions.noTrigger();
        invoke(action);

        expect(store.dispatch).not.toHaveBeenCalled();
    });
});