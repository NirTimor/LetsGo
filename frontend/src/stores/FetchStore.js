import { flow, extendObservable, action, makeObservable, computed } from 'mobx';
import PollingStore from './PollingStore';

export const asyncStates = {
    INITIAL: 'initial',
    LOADING: 'loading',
    LONG_LOADING: 'longLoading',
    ERROR: 'error',
    LOADED: 'loaded',
    POLLING: 'polling'
};

class FetchStore {
    constructor({
        id = '',
        data = {},
        fetchApi,
        parseResponse = () => {},
        setParsedResponse = true,
        polling = {},
        infiniteData = {},
        beforeFetch = () => {},
        afterFetch = () => {},
        onSuccess = () => {},
        onFail = () => {},
        onReset = () => {},
        abortRequest = () => {},
        ...props
}) {
        makeObservable(this, {
            reset: action,
            setData: action,
            setError: action,
            clearError: action,
            setLoadedState: action,
            setLoadingState: action,
            isLoaded: computed
        });
        this.id = id;
        this.beforeFetch = beforeFetch;
        this.afterFetch = afterFetch;
        this.onSuccess = onSuccess;
        this.fetchApi = fetchApi;
        this.onFail = onFail;
        this.initialData = data;
        this.parseResponse = parseResponse;
        this.setParsedResponse = setParsedResponse;
        this.onReset = onReset;
        this.abortRequest = abortRequest;
        this.props = {
            ...props
        };
        if (polling.enabled) {
            this.pollingStore = new PollingStore({ interval: polling.interval, pollOnFail: polling.pollOnFail });
        }
        extendObservable(this, {
            data,
            isLoading: false,
            isInitialFetch: false,
            isError: false,
            error: null,
            asyncState: asyncStates.INITIAL,
            get asyncData() {
                return {
                    isLoading: this.isLoading,
                    isError: this.isError,
                    isInitialFetch: this.isInitialFetch,
                    initialData: this.initialData,
                    data: this.data
                };
            }
        });
    }

    fetch = flow(function* fetchFunc(...args) {
        if (this.pollingStore && this.isInitialFetch) {
            this.isLoading = false;
            this.asyncState = asyncStates.POLLING;
        } else {
            this.isLoading = true;
            this.asyncState = asyncStates.LOADING;
        }
        this.isError = false;
        this.error = null;
        this.isInitialFetch = true;
        this.beforeFetch(...args);
        try {
            const response = yield this.fetchApi(...args);
            const parsedData = yield Promise.resolve(this.parseResponse(response, ...args));
            if (this.setParsedResponse) {
                this.data = parsedData;
            }
            // TODO - convert all afterFetch usage to onSuccess
            this.afterFetch(...args, response, parsedData);
            yield Promise.resolve(this.onSuccess({ params: args, response, parsedData }));
            this.isLoading = false;
            this.asyncState = asyncStates.LOADED;
            return 'success';
        } catch (error) {
            console.log('FetchStore -> fetch -> error', { id: this.id, error });
            // NEED A BETTER SOLUTION FOR ABORTING REQUESTS
            if (error.message === 'page change throw') {
                return 'aborted request';
            }
            this.isError = true;
            this.error = error;
            this.onFail(error, ...args);
            this.asyncState = asyncStates.ERROR;
            this.isLoading = false;
            throw error;
        }
    }).bind(this);

    abort = () => {
        this.abortRequest();
    }

    poll = {
        init: () => {
            this.pollingStore.setIsAborted(false);
            this.pollingStore.init(this.fetch);
        },
        abort: () => this.pollingStore.abort()
    }

    setData = (data) => {
        this.data = data;
    }

    getData = () => this.data;

    setLoadingState = () => {
        this.isLoading = true;
        this.asyncState = asyncStates.LOADING;
        this.isInitialFetch = true;
    }

    setLoadedState = () => {
        this.isLoading = false;
        this.asyncState = asyncStates.LOADED;
    }

    setError = (error) => {
        this.isError = true;
        this.error = error;
    }

    clearError = () => {
        this.isError = false;
        this.error = null;
    }

    reset = () => {
        this.data = this.initialData;
        this.isLoading = false;
        this.isInitialFetch = false;
        this.isError = false;
        this.error = null;
        this.pollingStore && this.poll.abort();
        this.infiniteDataStore && this.infiniteDataStore.reset();
        this.asyncState = asyncStates.INITIAL;
        this.onReset();
    };

    get isLoaded() {
        return this.asyncState === asyncStates.LOADED;
    }
}

export default FetchStore;
