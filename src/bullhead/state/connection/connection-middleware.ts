import {MiddlewareAPI} from 'redux';
import {getType} from 'typesafe-actions';
import {LightBullThunkDispatch} from '../../types/redux';
import {AuthenticationActions} from '../authentication/actions';
import {LightBullState} from '../index';
import {ShowsActions} from '../model/shows/actions';
import {WebSocketActions} from '../web-socket/actions';
import {ConnectionAction, ConnectionActions} from './actions';

type CAction = ConnectionAction;
type CDispatch = LightBullThunkDispatch;
type CMiddlewareAPI = MiddlewareAPI<CDispatch, LightBullState>;

export const connectionMiddleware = () => {
    return (api: CMiddlewareAPI) => (next: CDispatch) => (action: CAction) => {
        const isIdentified = () => api.getState().connection.connectionId !== undefined;

        const handleMessageUnidentified = (type: string, payload: any) => {
            if (type === 'identified') {
                if (payload && payload.connectionId) {
                    api.dispatch(ConnectionActions.identified(payload.connectionId));
                } else {
                    api.dispatch(AuthenticationActions.lost());
                }
            } else if (type === 'unidentified') {
                api.dispatch(AuthenticationActions.lost());
            }
        };

        const handleMessageIdentified = (type: string, payload: any) => {
            if (type === 'addShow') {
                api.dispatch(ShowsActions.add(payload.show));
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
                    type: 'identify',
                    payload: {
                        token: token
                    }
                }));
                break;
            case getType(ConnectionActions.handleMessage):
                const {type, payload, meta} = action.payload.message;
                if (isIdentified()) {
                    if (meta && meta.connectionId && meta.connectionId === api.getState().connection.connectionId) {
                        return;
                    }
                    handleMessageIdentified(type, payload);
                } else {
                    handleMessageUnidentified(type, payload);
                }
                break;
        }
        return result;
    };
};