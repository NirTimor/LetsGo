import React from 'react';
import { computed, makeObservable, observable } from 'mobx';
import Login from '../app/UnauthenticatedApp/Login';
import Register from '../app/UnauthenticatedApp/Register';
import Home from '../app/AuthenticatedApp/Home';
import Profile from '../app/AuthenticatedApp/Profile';
import Chat from '../app/AuthenticatedApp/Chat';
import Map from '../app/AuthenticatedApp/Map';

class RoutesStore {
    constructor() {
        makeObservable(this, {
            authorizedRoutes: observable,
            authorizedRoutesList: computed,
            mainPageRoute: computed,
        });
    }

    unauthorizedRoutes = {
        login: { 
            key: 'login', 
            path: '/login', 
            component: <Login />
        },
        register: {
            key: 'register',
            path: '/register',
            component: <Register />
        },
    }

    authorizedRoutes = {
        home: {
            key: 'home',
            path: '/home',
            component: <Home />,
        },
        profile: {
            key: 'profile',
            path: '/profile/:email',
            component: <Profile />,
        },
        chat: {
            key: 'chat',
            path: '/chat',
            component: <Chat />
        },
        map: {
            key: 'map',
            path: '/map',
            component: <Map />
        }
    }

    get authorizedRoutesList() {
        return Object.values(this.authorizedRoutes);
    }

    get unauthorizedRoutesList() {
        return Object.values(this.unauthorizedRoutes);
    }

    get mainPageRoute() {
        return this.authorizedRoutes.home.path;
    }
}

const routesStore = new RoutesStore();
const routesStoreContext = React.createContext(routesStore);
export const useRoutesStore = () => React.useContext(routesStoreContext);
export default routesStore;
