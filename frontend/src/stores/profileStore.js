/* eslint-disable no-throw-literal */
import React from 'react';
import { observable, action, makeObservable, computed } from "mobx";
import FetchStore from './FetchStore';
import { fetchUser, updateUser, fetchPosts, fetchFavoritePosts } from '../api/profileApi';
import authStore from './authStore';
import usersStore from './usersStore';
import { PAGE_SIZE, isEmpty } from '../utils';

export const interestOptions = [
    { value: 1, label: 'Hiking' },
    { value: 2, label: 'Cooking' },
    { value: 3, label: 'Photography' },
    { value: 4, label: 'Yoga' },
    { value: 5, label: 'Gardening' },
    { value: 6, label: 'Reading' },
    { value: 7, label: 'Painting' },
    { value: 8, label: 'Singing' },
    { value: 9, label: 'Dancing' },
    { value: 10, label: 'Camping' },
    { value: 11, label: 'Traveling' },
    { value: 12, label: 'Sports' },
    { value: 13, label: 'Movies' },
    { value: 14, label: 'Music' },
    { value: 15, label: 'Gaming' },
    { value: 16, label: 'Art' },
    { value: 17, label: 'Fashion' },
    { value: 18, label: 'Tech' },
    { value: 19, label: 'Cars' },
    { value: 20, label: 'Animals' },
    { value: 21, label: 'Nature' },
    { value: 22, label: 'Science' },
    { value: 23, label: 'Writing' },
    { value: 24, label: 'Volunteering' },
    { value: 25, label: 'Fitness' },
    { value: 26, label: 'DIY Projects' },
    { value: 27, label: 'Foodie' },
    { value: 28, label: 'Coding' },
    { value: 29, label: 'Meditation' },
    { value: 30, label: 'History' },
    { value: 31, label: 'Languages' },
    { value: 32, label: 'Science Fiction' },
    { value: 33, label: 'Comedy' },
    { value: 34, label: 'Travelling' },
    { value: 35, label: 'Adventure' },
    { value: 36, label: 'Swimming' },
    { value: 37, label: 'Skiing' },
    { value: 38, label: 'Running' },
    { value: 39, label: 'Cycling' },
    { value: 40, label: 'Baking' },
    { value: 41, label: 'Exercising' },
    { value: 42, label: 'Photography' },
    { value: 43, label: 'History' },
    { value: 44, label: 'Drawing' },
    { value: 45, label: 'Sculpting' },
    { value: 46, label: 'Fishing' },
    { value: 47, label: 'Chess' },
    { value: 48, label: 'Video Editing' },
    { value: 49, label: 'Reading' },
    { value: 50, label: 'Fashion' },
];

export const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese (Simplified)' },
    { value: 'ko', label: 'Korean' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'tr', label: 'Turkish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'sv', label: 'Swedish' },
    { value: 'fi', label: 'Finnish' },
    { value: 'pl', label: 'Polish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'he', label: 'Hebrew' },
    { value: 'th', label: 'Thai' },
    { value: 'el', label: 'Greek' },
    { value: 'no', label: 'Norwegian' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'ro', label: 'Romanian' },
    { value: 'id', label: 'Indonesian' },
    { value: 'sk', label: 'Slovak' },
    { value: 'cs', label: 'Czech' },
    { value: 'ta', label: 'Tamil' },
];

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
            this.setUser(response.data);
            usersStore.setUsersData(response.data.email, response.data);
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
            this.setUser(response.data);
            usersStore.setUsersData(response.data.email, response.data);
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