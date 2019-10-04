import {HttpActions} from '../app/http/actions';
import {AuthenticationActions} from './actions';

export const LOGIN_LABEL = 'login';

export const loginRequest = (password: string) => HttpActions.request(LOGIN_LABEL, {
    method: 'post',
    path: '/api/auth',
    body: {
        password: password
    },
    successHandler: (response: any, dispatch) => {
        const {jwt} = response;
        dispatch(AuthenticationActions.success(jwt));
    },
    errorHandler: (error: any, dispatch) => {
        if (error.response) {
            if (error.response.status === 401) {
                dispatch(AuthenticationActions.failure('Invalid password'));
            } else {
                dispatch(AuthenticationActions.failure('An unknown error occurred'));
            }
        } else {
            if (error.code === 'ECONNABORTED') {
                dispatch(AuthenticationActions.failure('Server took too long to respond'));
            } else {
                dispatch(AuthenticationActions.failure('An unknown error occurred'));
            }
        }
    }
});