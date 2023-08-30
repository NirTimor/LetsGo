import dayjs from 'dayjs';
import { method } from './apiUtils';
import apiClient from './apiClient';
import { PAGE_SIZE } from '../utils';
import authStore from '../stores/authStore';
    
export const fetchTrips = ({ page, ...filters }) => {
    const payload = {
        url: '/trip/',
        method: method.GET,
        params: {
            skip: PAGE_SIZE * (page - 1),
            limit: PAGE_SIZE,
            ...filters
        }
    };
    return apiClient(payload);
}

export const deleteTrip = (id) => {
    const payload = {
        url: '/trip/',
        method: method.DELETE,
        params: {
            trip_id: id
        }
    };
    return apiClient(payload);
}

export const createTrip = (tripDetails) => {
    const payload = {
        url: '/trip/',
        method: method.POST,
        data: {
            creation_datetime: dayjs().toISOString(),
            last_update_datetime: dayjs().toISOString(),
            user_email: authStore.userEmail,
            user_name: authStore.userName,
            ...tripDetails
        }
    };
    return apiClient(payload);
}

export const editTrip = ({ id, ...tripDetails }) => {
    const payload = {
        url: '/trip/',
        method: method.PUT,
        data: {
            id,
            last_update_datetime: dayjs().toISOString(),
            user_email: authStore.userEmail,
            ...tripDetails
        }
    };
    return apiClient(payload);
}

export const likeTrip = (tripId) => {
    const payload = {
        url: '/trip/like/',
        method: method.PUT,
        params: {
            email: authStore.userEmail,
            trip_id: tripId,
        }
    };
    return apiClient(payload);
}

export const unlikeTrip = (tripId) => {
    const payload = {
        url: '/trip/unlike/',
        method: method.PUT,
        params: {
            email: authStore.userEmail,
            trip_id: tripId,
        }
    };
    return apiClient(payload);
}

export const addToFavorites = (tripId) => {
    const payload = {
        url: '/trip/favorite/',
        method: method.PUT,
        params: {
            email: authStore.userEmail,
            trip_id: tripId,
        }
    };
    return apiClient(payload);
}

export const removeFromFavorites = (tripId) => {
    const payload = {
        url: '/trip/unfavorite/',
        method: method.PUT,
        params: {
            email: authStore.userEmail,
            trip_id: tripId,
        }
    };
    return apiClient(payload);
}

export const addComment = (tripId, comment) => {
    const payload = {
        url: '/trip/comment/',
        method: method.POST,
        data: {
            user_email: authStore.userEmail,
            text: comment,
        },
        params: {
            trip_id: tripId,
        }
    };
    return apiClient(payload);
}


export const deleteComment = (tripId, commentId) => {
    const payload = {
        url: '/trip/comment/',
        method: method.DELETE,
        params: {
            trip_id: tripId,
            comment_id: commentId,
        },
    };
    return apiClient(payload);
}

export const fetchLastFavoriteTrips = () => {
    const payload = {
        url: '/trip/favorites/',
        method: method.GET,
        params: {
            email: authStore.userEmail,
            skip: 0,
            limit: 3,
            asc: true
        }
    };
    return apiClient(payload);
}

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
