/* eslint-disable no-throw-literal */
import React from 'react';
import { observable, action, autorun, makeObservable, computed } from "mobx";
import FetchStore from './FetchStore';
import LocalStorage from './LocalStorage';
import { fetchLogin, fetchRegister } from "../api/authApi";

class AuthStore {
    constructor() {
        this.localStorage = new LocalStorage('authStore');
        this.isLoggedIn = this.localStorage.getData('isLoggedIn', false);
        this.user = this.localStorage.getData('user', null);
        this.rememberMe = true;

        makeObservable(this, {
            isLoggedIn: observable,
            user: observable,
            rememberMe: observable,
            setUser: action,
            setIsLoggedIn: action,
            userEmail: computed,
            likeTrip: action,
            unlikeTrip: action,
            addPostToFavorites: action,
            removePostFromFavorites: action,
            logout: action,
            userName: computed
        });
    }

    setUser = (user) => {
        this.user = user;
    }

    setIsLoggedIn = (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
    }

    login = new FetchStore({
        id: 'login',
        fetchApi: (username, password, rememberMe, navigate) => {
            this.rememberMe = rememberMe;
            return fetchLogin(username, password)
        },
        onSuccess: ({ response, params }) => {
            // Navigate to home
            params[3]("/");
            this.setUser(response.data);
            this.setIsLoggedIn(true);
        },
    })

    register = new FetchStore({
        id: 'login',
        fetchApi: ({ email, password, name, isMale, date, country, city }) => fetchRegister({ email, password, name, isMale, date, country, city }),
        parseResponse: (response) => {
            if (response.status === 200) throw ({ message: 'Email exists already' });
            if (response.status !== 201) throw ({ message: 'Could not register account, please try again later' });
            alert('Registration successfully completed!');
            window.location.href = '/';
        },
    })

    logout = () => {
        this.user = null;
        this.rememberMe = true;
        this.isLoggedIn = false;
    }

    get userEmail() {
        return this.user?.email
    }

    get userName() {
        return this.user?.name
    }

    likeTrip = (tripId) => {
        this.setUser({ ...this.user, liked_trips: [...this.user.liked_trips, tripId] })
    }

    unlikeTrip = (tripId) => {
        this.setUser({ ...this.user, liked_trips: this.user.liked_trips.filter((_tripId) => tripId !== _tripId) })
    }

    addPostToFavorites = (tripId) => {
        this.setUser({ ...this.user, favorite_trips: [...this.user.favorite_trips, tripId] })
    }

    removePostFromFavorites = (tripId) => {
        this.setUser({ ...this.user, favorite_trips: this.user.favorite_trips.filter((_tripId) => tripId !== _tripId) })
    }
};

const authStore = new AuthStore();

autorun(() => {
    window.localStorage.setItem('authStore', JSON.stringify({ isLoggedIn: authStore.isLoggedIn, user: authStore.user }));
});

const authStoreContext = React.createContext(authStore);
export const useAuthStore = () => React.useContext(authStoreContext);
export default authStore;