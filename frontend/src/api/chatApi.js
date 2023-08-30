import { method } from './apiUtils';
import apiClient from './apiClient';
import authStore from '../stores/authStore';
    
export const fetchAllChats = () => {
    const payload = {
        url: '/chat/',
        method: method.GET,
        params: {
            email: authStore.userEmail
        }
    };
    return apiClient(payload);
}

export const fetchChatByEmails = (email) => {
    const payload = {
        url: '/chat/emails/',
        method: method.GET,
        params: {
            email_user1: authStore.userEmail,
            email_user2: email,
        }
    };
    return apiClient(payload);
}

export const sendMessage = ({ message, receiverEmail }) => {
    const payload = {
        url: '/chat/message/',
        method: method.POST,
        data: {
            message,
            receiver_email: receiverEmail,
            sender_email: authStore.userEmail
        }
    };
    return apiClient(payload);
}
