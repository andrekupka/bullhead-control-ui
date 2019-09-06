import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const DEFAULT_TIMEOUT = 10000;

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT
});