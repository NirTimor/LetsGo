/* eslint-disable no-throw-literal */
import React from 'react';
import { observable, action, makeObservable } from "mobx";
import FetchStore from './FetchStore';
import { fetchUser, searchUser } from "../api/usersApi";
import { isEmpty } from 'lodash';

class UsersStore {
    constructor() {
        this.usersData = new Map();

        makeObservable(this, {
            usersData: observable,
            setUsersData: action,
        });
    }

    getUser = new FetchStore({
        id: 'get-user',
        fetchApi: (email) => fetchUser(email),
        onSuccess: ({ response }) => {
            const user = response.data;
            this.setUsersData(user.email, user);
        }
    });

    searchUser = new FetchStore({
        id: 'search-user',
        data: [],
        fetchApi: (name) => searchUser(name),
        parseResponse: (response, name) => {
            if (isEmpty(name)) return [];
            return response.data;
        }
    })

    setUsersData = (email, user) => {
        this.usersData.set(email, user);
    }

    fetchUser = (email) => {
        if (!this.usersData.get(email)) {
            this.getUser.fetch(email);
        }
    };

    getName = (email) => {
        return this.usersData.get(email)?.name;
    };

    getProfilePhoto = (email) => {
        return this.usersData.get(email)?.profile_photo;
    };

    getPhotos = (email) => {
        const profilePhoto = this.usersData.get(email)?.profile_photo;
        const photos = this.usersData.get(email)?.photos;
        if (!isEmpty(profilePhoto)) {
            return [profilePhoto, ...photos];
        }
        return photos || [];
    };
};

const usersStore = new UsersStore();
const usersStoreContext = React.createContext(usersStore);
export const useUsersStore = () => React.useContext(usersStoreContext);
export default usersStore;