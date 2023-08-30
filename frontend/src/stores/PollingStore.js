class PollingStore {
    constructor({ interval = 60000, pollOnFail = false }) {
        this.interval = interval;
        this.pollOnFail = pollOnFail;
        this.isAborted = false;
    }

    init = async (fetchPromise) => {
        if (!this.isAborted) {
            try {
                await fetchPromise();
                setTimeout(() => this.init(fetchPromise), this.interval);
            } catch (error) {
                if (this.pollOnFail) {
                    setTimeout(() => this.init(fetchPromise), this.interval);
                }
            }
        }
    }

    setInterval = (interval) => {
        this.interval = interval;
    }

    setIsAborted = (isAborted) => {
        this.isAborted = isAborted;
    }

    abort = () => {
        this.setIsAborted(true);
    }
}

export default PollingStore;
