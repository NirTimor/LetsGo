import { method } from './apiUtils';
import apiClient from './apiClient';
import { PAGE_SIZE } from '../utils';

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

export const fetchPosts = (email, page) => {
    const payload = {
        url: '/trip/email/',
        method: method.GET,
        params: {
            email,
            skip: PAGE_SIZE * (page - 1),
            limit: PAGE_SIZE,
            asc: true
        }
    };
    return apiClient(payload);
}

export const fetchFavoritePosts = (email, page) => {
    const payload = {
        url: '/trip/favorites/',
        method: method.GET,
        params: {
            email,
            skip: PAGE_SIZE * (page - 1),
            limit: PAGE_SIZE,
            asc: true
        }
    };
    return apiClient(payload);
}

export const updateUser = (params) => {
    const payload = {
        url: '/user/',
        method: method.PUT,
        data: params
    };
    return apiClient(payload);
}
