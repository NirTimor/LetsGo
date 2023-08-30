import { method } from './apiUtils';
import apiClient from './apiClient';

export const fetchUser = (email) => {
    const payload = {
        url: '/user/',
        method: method.GET,
        params: {
            email,
        }
    };
    return apiClient(payload);
}

export const searchUser = (name) => {
    const payload = {
        url: '/search_users/',
        method: method.GET,
        params: {
            name,
        }
    };
    return apiClient(payload);
}