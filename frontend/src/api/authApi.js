import { method } from './apiUtils';
import apiClient from './apiClient';
    
export const fetchLogin = (email, password) => {
    const payload = {
        url: '/user/login/',
        method: method.POST,
        data: {
            email,
            password
        }
    };
    return apiClient(payload);
}

export const fetchRegister = ({ email, password, name, isMale, date, country, city }) => {
    const payload = {
        url: '/user/',
        method: method.POST,
        data: { 
            email, 
            password, 
            name, 
            is_male: isMale, 
            birthdate: date, 
            country, 
            city 
        }
    }
    return apiClient(payload);
}

export const fetchUserInfo = (email) => {
    const payload = {
        url: '/users/details/',
        method: method.GET,
        params: {
            email
        }
    };
    return apiClient(payload);
}

