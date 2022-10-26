import { Dialog, Alert, AlertTitle, Snackbar } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

const SnackbarAlert = ({alertOpen, toggleAlert, alertSeverity, alertText}) => {

    return (
        <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={toggleAlert}
        >
            <Alert onClose={toggleAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertText}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert;