/* eslint-disable no-throw-literal */
import React from 'react';
import { observable, action, makeObservable } from "mobx";

export const AUTO_HIDE_DURATION = 4500;

class AlertsStore {
    constructor() {
        this.success = { isOn: false, message: '' };
        this.warning = { isOn: false, message: '' };
        this.error = { isOn: false, message: '' };
        this.info = { isOn: false, message: '' };

        makeObservable(this, {
            success: observable,
            warning: observable,
            info: observable,
            error: observable,
            alert: action,
        });
    }

    alert = (severity, message) => {
        this[severity] = { isOn: true, message };
        setTimeout(() => {
            this[severity] = { isOn: false, message: '' };
        }, AUTO_HIDE_DURATION);
    }

    close = (severity) => {
        this[severity] = { isOn: false, message: '' };
    }
};

const alertsStore = new AlertsStore();
const alertsStoreContext = React.createContext(alertsStore);
export const useAlertsStore = () => React.useContext(alertsStoreContext);
export default alertsStore;