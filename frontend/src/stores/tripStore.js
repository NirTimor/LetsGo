import React from 'react';
import { observable, action, makeObservable, computed } from "mobx";
import FetchStore from './FetchStore';
import { fetchTrips, likeTrip, unlikeTrip, addComment, deleteComment, createTrip, deleteTrip, addToFavorites, removeFromFavorites, editTrip } from '../api/tripApi';
import authStore from './authStore';
import alertsStore from './alertsStore';
import profileStore from './profileStore';
import usersStore from './usersStore';
import { PAGE_SIZE } from '../utils';

export const tripDetailsKeys = {
    country: 'country',
    city: 'city',
    startMonth: 'start_month',
    endMonth: 'end_month',
    durationDays: 'duration_days',        
    asc: 'asc',
    details: 'details',
    isFlexible: 'is_flexible',
    photos: 'photos',
    interests: 'interests',
    isMale: 'is_male',
    minAge: 'start_age_range',
    maxAge: 'end_age_range',
}

export const DEFAULT_DURATION_DAYS = 7;

class TripStore {
    constructor() {
        this.filters = {
            [tripDetailsKeys.country]: undefined,
            [tripDetailsKeys.city]: undefined,
            [tripDetailsKeys.startMonth]: undefined,
            [tripDetailsKeys.endMonth]: undefined,
            [tripDetailsKeys.durationDays]: DEFAULT_DURATION_DAYS,        
            [tripDetailsKeys.asc]: true,
            [tripDetailsKeys.isFlexible]: true,
            [tripDetailsKeys.interests]: [],
            [tripDetailsKeys.isMale]: undefined,
            [tripDetailsKeys.minAge]: 0,
            [tripDetailsKeys.maxAge]: 99,
        }

        this.postDetails = {
            [tripDetailsKeys.country]: undefined,
            [tripDetailsKeys.city]: undefined,
            [tripDetailsKeys.startMonth]: undefined,
            [tripDetailsKeys.endMonth]: undefined,
            [tripDetailsKeys.durationDays]: DEFAULT_DURATION_DAYS,        
            [tripDetailsKeys.details]: undefined,
            [tripDetailsKeys.isFlexible]: false,
            [tripDetailsKeys.photos]: [],
        }

        this.page = 1;

        this.hasMoreData = true;

        makeObservable(this, {
            filters: observable,
            page: observable,
            postDetails: observable,
            hasMoreData: observable,
            addLikeToPost: action,
            removeLikeFromPost: action,
            setPostDetails: action,
            removePost: action,
            setDbData: action,
            postsData: computed,
            resetNewPost: action,
            setPage: action,
            onUpdateTrip: action,
        });
    }

    db = new FetchStore({
        id: 'trips-db',
        data: new Map(),
        fetchApi: () => {
            if (this.page === 1) {
                this.db.setData(new Map());
            }
            return fetchTrips({
                page: this.page,
                ...this.filters,
                [tripDetailsKeys.interests]: this.filters[tripDetailsKeys.interests].join(','),
            })
        },
        setParsedResponse: false,
        onSuccess: ({ response }) => {
            response.data.forEach((trip) => {
                this.setDbData(trip._id, trip);
                usersStore.fetchUser(trip.user_email);
            });
            this.hasMoreData = response.data.length === PAGE_SIZE;
            this.page++;
        },
    })

    likeTrip = new FetchStore({
        id: 'like-trip',
        fetchApi: (trip) => likeTrip(trip._id),
        onSuccess: ({ params }) => {
            const trip = params[0];
            authStore.likeTrip(trip._id);
            profileStore.addLikeToPost(trip)
            this.addLikeToPost(trip);
        },
    })

    unlikeTrip = new FetchStore({
        id: 'unlike-trip',
        fetchApi: (trip) => unlikeTrip(trip._id),
        onSuccess: ({ params }) => {
            const trip = params[0];
            authStore.unlikeTrip(trip._id);
            profileStore.removeLikeFromPost(trip)
            this.removeLikeFromPost(trip);
        },
    })

    addToFavorites = new FetchStore({
        id: 'add-to-favorites',
        fetchApi: (trip) => addToFavorites(trip._id),
        onSuccess: ({ params }) => {
            const trip = params[0];
            profileStore.addToFavorites(trip)
            authStore.addPostToFavorites(trip._id);
            this.addPostToFavorites(trip);
        },
    })

    removeFromFavorites = new FetchStore({
        id: 'remove-from-favorites',
        fetchApi: (trip) => removeFromFavorites(trip._id),
        onSuccess: ({ params }) => {
            const trip = params[0];
            profileStore.removeFromFavorites(trip)
            authStore.removePostFromFavorites(trip._id);
            this.removePostFromFavorites(trip);
        },
    })

    addComment = new FetchStore({
        id: 'add-comment',
        fetchApi: (tripId, comment) => addComment(tripId, comment),
        onSuccess: ({ response }) => {
            this.setDbData(response.data._id, response.data);
            profileStore.setData(response.data._id, response.data);
        },
    })

    deleteComment = new FetchStore({
        id: 'delete-comment',
        fetchApi: (tripId, commentId) => deleteComment(tripId, commentId),
        onSuccess: ({ response }) => {
            this.setDbData(response.data._id, response.data);
            profileStore.setData(response.data._id, response.data);
        },
    })

    createTrip = new FetchStore({
        id: 'create-trip',
        fetchApi: () => createTrip(this.postDetails),
        onSuccess: ({ response }) => {
            this.setDbData(response.data._id, response.data);
            alertsStore.alert('success', 'Successfully created trip')
        },
    })

    editTrip = new FetchStore({
        id: 'edit-trip',
        fetchApi: (id) => editTrip({ id, ...this.postDetails }),
        onSuccess: ({ response }) => {
            this.setDbData(response.data._id, response.data);
            profileStore.setData(response.data._id, response.data)
            alertsStore.alert('success', 'Successfully updated trip')
        },
    })

    deleteTrip = new FetchStore({
        id: 'create-trip',
        fetchApi: (id) => deleteTrip(id),
        onSuccess: ({ params }) => {
            const id = params[0];
            this.removePost(id);
            profileStore.removePost(id);
            alertsStore.alert('success', 'Successfully deleted trip');
        },
    })

    setFilters = (filterKey, filterValue) => {
        this.filters = { ...this.filters, [filterKey]: filterValue };
    }

    setPostDetails = (key, value) => {
        this.postDetails = { ...this.postDetails, [key]: value }
    }

    addLikeToPost = (trip) => {
        this.db.data.set(trip._id, { ...trip, likes: trip.likes + 1, liked_users: [...trip.liked_users, authStore.userEmail] });
    }

    removeLikeFromPost = (trip) => {
        this.db.data.set(trip._id, { ...trip, likes: trip.likes - 1, liked_users: trip.liked_users.filter((user) => user !== authStore.userEmail) });
    }

    addPostToFavorites = (trip) => {
        this.db.data.set(trip._id, { ...trip, favorites_users: [...trip.favorites_users, authStore.userEmail] });
    }

    removePostFromFavorites = (trip) => {
        this.db.data.set(trip._id, { ...trip, favorites_users: trip.favorites_users.filter((user) => user !== authStore.userEmail) });
    }

    setDbData = (tripId, trip) => {
        this.db.data.set(tripId, trip);
    }

    removePost = (tripId) => {
        this.db.data.delete(tripId);
    }

    resetNewPost = () => {
        this.postDetails = {
            [tripDetailsKeys.country]: undefined,
            [tripDetailsKeys.city]: undefined,
            [tripDetailsKeys.startMonth]: undefined,
            [tripDetailsKeys.endMonth]: undefined,
            [tripDetailsKeys.durationDays]: DEFAULT_DURATION_DAYS,        
            [tripDetailsKeys.details]: undefined,
            [tripDetailsKeys.isFlexible]: false,
            [tripDetailsKeys.photos]: [],
        }
    }

    onUpdateTrip = (trip) => {
        this.postDetails = {
            [tripDetailsKeys.country]: trip[tripDetailsKeys.country],
            [tripDetailsKeys.city]: trip[tripDetailsKeys.city],
            [tripDetailsKeys.startMonth]: trip[tripDetailsKeys.startMonth],
            [tripDetailsKeys.endMonth]: trip[tripDetailsKeys.endMonth],
            [tripDetailsKeys.durationDays]: trip[tripDetailsKeys.durationDays],        
            [tripDetailsKeys.details]: trip[tripDetailsKeys.details],
            [tripDetailsKeys.isFlexible]: trip[tripDetailsKeys.isFlexible],
            [tripDetailsKeys.photos]: trip[tripDetailsKeys.photos],
        }
    }

    setPage = (page) => {
        this.page = page;
    }

    get postsData() {
        const data = [...this.db.data.values()];
        const sortedData = data.sort((post1, post2) => new Date(post2.creation_datetime) - new Date(post1.creation_datetime));
        return sortedData;
    }
};

const tripStore = new TripStore();
const tripStoreContext = React.createContext(tripStore);
export const useTripStore = () => React.useContext(tripStoreContext);
export default tripStore;