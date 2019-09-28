import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Show} from '../model/Show';

export const BASE_URL = 'http://localhost:8080';
export const DEFAULT_TIMEOUT = 10000;

type AxiosRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig;

class ApiClient {

    private axiosClient: AxiosInstance;

    constructor(baseURL: string, timeout: number = DEFAULT_TIMEOUT) {
        this.axiosClient = axios.create({
            baseURL: baseURL,
            timeout: timeout
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

    async updateShow(show: Show): Promise<Show> {
        const response = await this.axiosClient.put(`/api/shows/${show.id}`, show);
        return response.data;
    }
}

type HeaderConfigurer = (headers: any) => void;

export const createApi = (baseUrl: string, headerConfigurer: HeaderConfigurer, timeout: number): ApiClient => {
    const api = new ApiClient(baseUrl, timeout);
    api.useRequestInterceptor(config => {
        headerConfigurer(config.headers);
        return config;
    });
    return api;
};
