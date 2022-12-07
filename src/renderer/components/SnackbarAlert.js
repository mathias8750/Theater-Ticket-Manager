import {Alert, Snackbar} from '@mui/material';
import React from 'react';

// Snackbar alert used for most alerts in the program
const SnackbarAlert = ({alertOpen, toggleAlert, alertSeverity, alertText}) => {

  return (
    <Snackbar
      open={alertOpen}
      autoHideDuration={6000}
      onClose={toggleAlert}
    >
      <Alert onClose={toggleAlert} severity={alertSeverity} sx={{width: '100%'}}>
        {alertText}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert;
