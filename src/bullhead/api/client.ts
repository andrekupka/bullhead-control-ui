import axios from 'axios';
import {AxiosInstance, AxiosRequestConfig} from 'axios';
import {ShowCollection} from "../model/Show";
import {LightBullState} from "../state";
import {Store} from 'redux';
import {store} from "../store";

const BASE_URL = 'http://localhost:8080';
const DEFAULT_TIMEOUT = 10000;

type AxiosRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;

class ApiClient {

    private axiosClient: AxiosInstance;

    constructor(baseURL: string, timeout: number = DEFAULT_TIMEOUT) {
        this.axiosClient = axios.create({
            baseURL: baseURL,
            timeout: timeout,
        });
    }

    useRequestInterceptor(interceptor: AxiosRequestInterceptor): void {
       this.axiosClient.interceptors.request.use(interceptor);
    }

    async login(password: string): Promise<string | undefined> {
        const response = await this.axiosClient.post('/api/login', {
            password: password
        });
        const {token} = response.data;
        return await token;
    }

    async loadShows(): Promise<ShowCollection> {
        const response = await this.axiosClient.get('/api/shows');
        return response.data;
    }
}

const initializeApi = (store: Store<LightBullState>, baseUrl: string, timeout: number): ApiClient => {
    const api = new ApiClient(baseUrl, timeout);
    api.useRequestInterceptor(config => {
        const token = store.getState().authentication.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return api;
};

export const Api = initializeApi(store, BASE_URL, DEFAULT_TIMEOUT);
