import React from 'react';
import { observer } from 'mobx-react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAlertsStore, AUTO_HIDE_DURATION } from '../stores/alertsStore';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UiAlerts = () => {
    const { success, error, warning, info, close } = useAlertsStore();

    return (
        <>
            <Snackbar open={success.isOn} autoHideDuration={AUTO_HIDE_DURATION} onClose={() => close('success')}>
                <Alert onClose={() => close('success')} severity="success" sx={{ width: '100%' }}>
                    {success.message}
                </Alert>
            </Snackbar>
            <Snackbar open={warning.isOn} autoHideDuration={AUTO_HIDE_DURATION} onClose={() => close('warning')}>
                <Alert onClose={() => close('warning')} severity="warning" sx={{ width: '100%' }}>
                    {warning.message}
                </Alert>
            </Snackbar>
            <Snackbar open={info.isOn} autoHideDuration={AUTO_HIDE_DURATION} onClose={() => close('info')}>
                <Alert onClose={() => close('info')} severity="info" sx={{ width: '100%' }}>
                    {info.message}
                </Alert>
            </Snackbar>
            <Snackbar open={error.isOn} autoHideDuration={AUTO_HIDE_DURATION} onClose={() => close('error')}>
                <Alert onClose={() => close('error')} severity="error" sx={{ width: '100%' }}>
                    {error.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default observer(UiAlerts);
