import {MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullThunkDispatch} from '../../types/redux';
import {LightBullMessage} from '../../types/types';
import {AuthenticationActions} from '../authentication/actions';
import {LightBullState} from '../index';
import {ShowModelActions} from '../model/shows/actions';
import {WebSocketActions} from '../web-socket/actions';
import {ConnectionAction, ConnectionActions} from './actions';
import {VisualModelActions} from '../model/visuals/actions';

type CAction = ConnectionAction;
type CDispatch = LightBullThunkDispatch;
type CMiddlewareAPI = MiddlewareAPI<CDispatch, LightBullState>;

export const connectionMiddleware = () => {
    return (api: CMiddlewareAPI) => (next: CDispatch) => (action: CAction) => {
        const isIdentified = () => api.getState().connection.connectionId !== undefined;

        const handleMessage = (message: LightBullMessage) => {
            const {topic, payload, meta} = message;
            if (isIdentified()) {
                if (meta && meta.connectionId && meta.connectionId === api.getState().connection.connectionId) {
                    return;
                }
                handleMessageIdentified(topic, payload);
            } else {
                handleMessageUnidentified(topic, payload);
            }
        };

        const handleMessageUnidentified = (topic: string, payload: any) => {
            if (topic === 'identified') {
                if (payload && payload.connectionId) {
                    api.dispatch(ConnectionActions.identified(payload.connectionId));
                } else {
                    api.dispatch(AuthenticationActions.lost());
                }
            } else if (topic === 'unidentified') {
                api.dispatch(AuthenticationActions.lost());
            }
        };

        const handleMessageIdentified = (topic: string, payload: any) => {
            if (topic === 'show_added') {
                api.dispatch(ShowModelActions.set(payload));
            } else if (topic === 'show_changed') {
                api.dispatch(ShowModelActions.set(payload));
            } else if (topic === 'visual_added') {
                api.dispatch(VisualModelActions.add(payload));
            } else if (topic === 'visual_changed') {
                api.dispatch(VisualModelActions.set(payload));
            }
        };

        const result = next(action);
        switch (action.type) {
            case getType(ConnectionActions.identify):
                const token = api.getState().authentication.token;
                if (!token) {
                    throw new Error('Invalid state, token is not initialized');
                }
                api.dispatch(WebSocketActions.send({
                    topic: 'identify',
                    payload: {
                        token: token
                    }
                }));
                break;
            case getType(ConnectionActions.handleMessage):
                handleMessage(action.payload.message);
                break;
        }
        return result;
    };
};