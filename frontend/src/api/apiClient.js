import axios from 'axios';
import { method as methodConstant } from './apiUtils';

const apiClient = (payload) => {
    const {
        url,
        method = methodConstant.GET,
        headers,
        data,
        params,
    } = payload;

    const requestHeaders = { 
        'Content-Type': 'application/json'
    }

    const baseURL = 'http://127.0.0.1:8000';

    const fetchSettings = {
        url: baseURL + url,
        method,
        headers: {
            ...requestHeaders,
            ...headers
        }
    };

    if (data) {
        fetchSettings.data = data;
    }

    if (params) {
        fetchSettings.params = params;
    }

    return axios
        .request(fetchSettings)
        .catch((error) => {
            throw error;
        })
};

export default apiClient;
