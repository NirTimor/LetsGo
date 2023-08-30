import _get from 'lodash/get';

class LocalStorage {
    constructor(store) {
        this.store = store;
    }
    
    getData(key, initial = null) {
        try {
            const localStorageStore = window.localStorage.getItem(this.store);
            const store = JSON.parse(localStorageStore);
            if (!store) return initial;
            return _get(store, `${key}`) || initial;
        } catch (error) {
            return null;
        }
    }
}

export default LocalStorage;
