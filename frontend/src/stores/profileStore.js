/* eslint-disable no-throw-literal */
import React from 'react';
import { observable, action, makeObservable, computed } from "mobx";
import FetchStore from './FetchStore';
import { fetchUser, updateUser, fetchPosts, fetchFavoritePosts } from '../api/profileApi';
import authStore from './authStore';
import usersStore from './usersStore';
import { PAGE_SIZE, isEmpty, interestOptions } from '../utils';

export const tabs = {
    posts: 'Posts',
    favoritePosts: 'Favorite',
}

class ProfileStore {
    constructor() {
        this.user = {};

        this.tab = tabs.posts;

        this.postsPage = 1;

        this.hasMorePosts = true;

        this.favoritePostsPage = 1;

        this.hasMoreFavoritePosts = true;

        makeObservable(this, {
            user: observable,
            tab: observable,
            postsPage: observable,
            setUser: action,
            setTab: action,
            objectInterests: computed,
            isMyProfile: computed,
            addToFavorites: action,
            removeFromFavorites: action,
            postsData: computed,
            favoritePostsData: computed,
            setData: action,
            isPostsFirstPage: computed,
            isFavPostsFirstPage: computed,
        });
    }

    fetchUser = new FetchStore({
        id: 'fetch-user',
        fetchApi: (email) => fetchUser(email),
        onSuccess: ({ response }) => {
            const user = response.data;
            this.setUser(user);
            usersStore.setUsersData(response.data.email, user);
        },
    });

    posts = new FetchStore({
        id: 'fetch-posts',
        data: new Map(),
        setParsedResponse: false,
        fetchApi: (email) => fetchPosts(email, this.postsPage),
        onSuccess: ({ response }) => {
            response.data.forEach((post) => {
                this.setPostsData(post._id, post);
            });
            this.hasMorePosts = response.data.length === PAGE_SIZE;
            this.postsPage++;
        },
    });

    favoritePosts = new FetchStore({
        id: 'fetch-favorite-posts',
        data: new Map(),
        setParsedResponse: false,
        fetchApi: (email) => fetchFavoritePosts(email, this.favoritePostsPage),
        onSuccess: ({ response }) => {
            response.data.forEach((post) => {
                this.setFavoritePostsData(post._id, post);
                usersStore.fetchUser(post.user_email);
            });
            this.hasMoreFavoritePosts = response.data.length === PAGE_SIZE;
            this.favoritePostsPage++;
        },
    });

    updateUser = new FetchStore({
        id: 'update-user',
        fetchApi: (key, value) => updateUser({ ...this.user, [key]: value }),
        onSuccess: ({ response }) => {
            const user = response.data
            this.setUser(user);
            authStore.setUser(user);
            usersStore.setUsersData(response.data.email, user);
        },
    });

    reset = () => {
        this.setUser({});
        this.favoritePosts.data = new Map();
        this.posts.data = new Map();
        this.postsPage = 1;
        this.favoritePostsPage = 1;
    }

    setUser = (user) => {
        this.user = { ...user };
    }

    setTab = (tab) => {
        this.tab = tab;
    }

    setPostsData = (postId, post) => {
        this.posts.data.set(postId, post);
    }

    setFavoritePostsData = (postId, post) => {
        this.favoritePosts.data.set(postId, post);
    }

    addToFavorites = (post) => {
        this.setFavoritePostsData(post._id, post);
    }

    removeFromFavorites = (post) => {
        this.favoritePosts.data.delete(post._id);
    }

    addLikeToPost = (trip) => {
        if (!isEmpty(this.favoritePosts.data.get(trip._id))) {
            this.favoritePosts.data.set(trip._id, { ...trip, likes: trip.likes + 1, liked_users: [...trip.liked_users, authStore.userEmail] });
        }
        this.posts.data.set(trip._id, { ...trip, likes: trip.likes + 1, liked_users: [...trip.liked_users, authStore.userEmail] });
    }

    removeLikeFromPost = (trip) => {
        if (!isEmpty(this.favoritePosts.data.get(trip._id))) {
            this.favoritePosts.data.set(trip._id, { ...trip, likes: trip.likes - 1, liked_users: trip.liked_users.filter((user) => user !== authStore.userEmail) });
        }
        this.posts.data.set(trip._id, { ...trip, likes: trip.likes - 1, liked_users: trip.liked_users.filter((user) => user !== authStore.userEmail) });
    }

    removePost = (id) => {
        this.favoritePosts.data.delete(id);
        this.posts.data.delete(id);
    }

    setData = (postId, post) => {
        this.setPostsData(postId, post);
        this.setFavoritePostsData(postId, post)
    }

    get objectInterests() {
        const result = {}
        interestOptions.forEach((interest) => {
            result[interest.value] = interest;
        })
        return result;
    }

    get postsData() {
        return [...this.posts.data.values()].sort((post1, post2) => new Date(post2.creation_datetime) - new Date(post1.creation_datetime));;
    }

    get favoritePostsData() {
        return [...this.favoritePosts.data.values()].sort((post1, post2) => new Date(post2.creation_datetime) - new Date(post1.creation_datetime));;
    }

    get isMyProfile() {
        return this.user.email === authStore.userEmail;
    }

    get isPostsFirstPage() {
        return this.postsPage === 1;
    }

    get isFavPostsFirstPage() {
        return this.favoritePostsPage === 1;
    }
};

const profileStore = new ProfileStore();
const profileStoreContext = React.createContext(profileStore);
export const useProfileStore = () => React.useContext(profileStoreContext);
export default profileStore;