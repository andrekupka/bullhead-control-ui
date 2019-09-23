import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Config} from '../model/Config';
import {Show, ShowCollection, ShowWithVisuals} from '../model/Show';
import {Visual} from '../model/Visual';

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

    async loadConfig(): Promise<Config> {
        const response = await this.axiosClient.get('/api/config');
        return response.data;
    }

    async loadShows(): Promise<ShowCollection> {
        const response = await this.axiosClient.get('/api/shows');
        return response.data;
    }

    async createShow(name: string): Promise<Show> {
        const response = await this.axiosClient.post('/api/shows', {
            name: name
        });
        return response.data
    }

    async loadShow(showId: string): Promise<ShowWithVisuals> {
        const response = await this.axiosClient.get(`/api/shows/${showId}`);
        return response.data;
    }

    async updateShow(show: Show): Promise<Show> {
        const response = await this.axiosClient.put(`/api/shows/${show.id}`, show);
        return response.data;
    }

    async createVisual(showId: string, name: string): Promise<Visual> {
        const response = await this.axiosClient.post(`/api/visuals`, {
            show: showId,
            name: name
        });
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
