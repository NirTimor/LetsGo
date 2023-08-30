import React from 'react';
import { observable, action, computed, makeObservable } from 'mobx';

class DarkModeStore {
    constructor() {
        this.isDarkMode = false;

        makeObservable(this, {
            isDarkMode: observable,
            mode: computed,
            setIsDarkMode: action
        });
    }

    get mode() {
        return this.isDarkMode ? 'Dark' : 'Light';
    }

    setIsDarkMode = () => { this.isDarkMode = !this.isDarkMode };
}

const darkModeStore = new DarkModeStore();
const darkModeContext = React.createContext(darkModeStore);
export const useDarkModeStore = () => React.useContext(darkModeContext);
